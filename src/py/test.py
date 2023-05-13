import sys
from Adafruit_IO import MQTTClient, Client
import time
import random
from firebase import firebase
from datetime import date, datetime
import pytz


FEED_LST = ["bbc-fan", "bbc-led", "bbc-pump", "bbc-temp"]
USERNAME = "IOTFarm_222"
KEY = "aio_Snww48prmq6tnihUsDGx70xRGlOw"
stat=0

def connected(client:MQTTClient):
    for i in FEED_LST:
        try:
            client.subscribe(i)
            print("Success connect to "+ i)
        except: print("Failed to connect to "+i)
        
# get 1 data point from feed
# param: clientMQTT, feed_id
# return last value from adafruit feed 
def get_status(client, feed_id):
    return client.receive(feed_id).value


# get all data from feed 30 days ago, include: value, time
def get_history(client, feed_id):
    # Retrieve historical data for a feed
    data_list = client.data(feed_id)
    gmt7_timezone = pytz.timezone('Asia/Jakarta')
    
    data_list_parse = [] # list nay chi lay ra 2 du lieu la created_at va value trong data_list
    for data in data_list:
        utc_time = data.created_at
        input_format = '%Y-%m-%dT%H:%M:%SZ'
        # Convert the string to a datetime object
        input_datetime = datetime.strptime(utc_time, input_format)
        # Convert the datetime object to GMT+7 timezone
        local_datetime = pytz.utc.localize(input_datetime).astimezone(gmt7_timezone)
        # Convert the datetime object back to a string in ISO format with UTC time zone indicator
        local_time_str = local_datetime.strftime('%Y-%m-%dT%H:%M:%SZ')
        temp = local_time_str.split('T')
        dates = datetime.strptime(temp[0], "%Y-%m-%d").date()
        times = datetime.strptime(temp[1][:-1], "%H:%M:%S").time()
        # print((dates - date.today()).days)
        if ((dates - date.today()).days) <= 30 :
            data_list_parse.append({
                "created_at": str(times),
                "value": data.value
            })
        else: break
    # Return the fan history list
    return data_list_parse


def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Disconnect")
    sys.exit (1)

def message(client , feed_id , payload):
    global stat
    print("Data received from " + feed_id  + ': ' + payload)
    # if feed_id=="V16":
    #     stat=payload   #data duoc luu trong bien stat
    # elif feed_id=="V1":
    #     client.publish("V16",max(int(stat),1))

clientMQTT = MQTTClient(USERNAME , KEY) # client nay dung de gui va nhan 1 du lieu den feed
clientHistory = Client(USERNAME, KEY) # client nay dung de lay du lieu lich su cua feed
clientMQTT.on_connect = connected
clientMQTT.on_disconnect = disconnected
clientMQTT.on_message = message
clientMQTT.on_subscribe = subscribe
clientMQTT.connect()
clientMQTT.loop_background()

# Firebase Connection
firebase = firebase.FirebaseApplication("https://iotfarm-c345c-default-rtdb.firebaseio.com/", None)


# dayTemp= []
# step = 12
# if midnight, add list of that days

# ì end month, add list day temp,


def main():
    while True:
        # Get all from ada and send all data to firebase
        tempAll = get_history(clientHistory, 'bbc-temp')
        # print(tempAll)
        firebase.post("iotfarm-c345c-default-rtdb/Temperature",  tempAll)
        humidityAll = get_history(clientHistory, 'bbc-fan')
        firebase.post("iotfarm-c345c-default-rtdb/Humidity",  humidityAll)
        luminousityAll = get_history(clientHistory, 'bbc-led')
        firebase.post("iotfarm-c345c-default-rtdb/Luminousity",  luminousityAll)
        moistureAll = get_history(clientHistory, 'bbc-pump')
        firebase.post("iotfarm-c345c-default-rtdb/Moisture",  moistureAll)
        print("----------------------------")
        time.sleep(15)

        # Get last data from ada
        # temp = get_status(clientHistory, 'bbc-temp') 

        # Get data from firebase
        # rel = firebase.get("iotfarm-c345c-default-rtdb/Temperature",'')
        # print(rel)

main()
   