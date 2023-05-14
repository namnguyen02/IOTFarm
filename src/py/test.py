import sys
from Adafruit_IO import MQTTClient, Client
import time
import random
from firebase import firebase
from datetime import date, datetime
import pytz
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
FEED_LST = ["v1", "v2", "v3", "v4"]
USERNAME = "IOTFarm_222"
KEY = "aio_Latc14lxX9nPWZGkhHYtqcfcZLKm"
stat=0
# Firebase Connection
firebase = firebase.FirebaseApplication("https://iotfarm-c345c-default-rtdb.firebaseio.com/", None)
def connected(client:MQTTClient):
    print("Ket noi thanh cong")
    for i in FEED_LST:
        client.subscribe(i)
        
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
    sys.exit(1)

def message(client , feed_id , payload):
    print("Data received from " + feed_id  + ': ' + payload)
    if feed_id == 'v1':
        firebase.post('/Temperature', {
            "value": payload,
            "datetime" : str(datetime.now())
        })
    elif feed_id == 'v2':
        firebase.post('/Humidity', {
            "value": payload,
            "datetime" : str(datetime.now())
        })
    elif feed_id == 'v3':
        firebase.post('/SoilMoisture', {
            "value": payload,
            "datetime" : str(datetime.now())
        })
    elif feed_id == 'v4':
        firebase.post('/Lumination', {
            "value": payload,
            "datetime" : str(datetime.now())
        })

# clientMQTT = MQTTClient(USERNAME , KEY) # client nay dung de gui va nhan 1 du lieu den feed
# clientHistory = Client(USERNAME, KEY) # client nay dung de lay du lieu lich su cua feed
# clientMQTT.on_connect = connected
# clientMQTT.on_disconnect = disconnected
# clientMQTT.on_message = message
# clientMQTT.on_subscribe = subscribe
# clientMQTT.connect()
# clientMQTT.loop_background()

app = Flask(__name__)
#    db = firebaseCon['iotfarm-c345c-default-rtdb']
CORS(app)

@app.route('/')
def index():
    return render_template('Home.js')
@app.route('/getLastData/Temperature', methods=['GET'])
def getLastData():
    # rel = firebase.get('', '')
    rel = firebase.get("/Temperature/",'')
    print(rel)
    keys = list(rel.keys())
    last_key = keys[-1]
    return rel[last_key]



# dayTemp= []
# step = 12
# if midnight, add list of that days

# ì end month, add list day temp,
app.debug = True
app.run()

def main():
    while True:
        pass
    '''
    while True:
        # Get all from ada and send all data to firebase
        tempAll = get_history(clientHistory, 'v1')
        # print(tempAll)
        firebase.post("/Temperature",  tempAll)
        humidityAll = get_history(clientHistory, 'v2')
        firebase.post("/Humidity",  humidityAll)
        luminousityAll = get_history(clientHistory, 'v4')
        firebase.post("/Luminousity",  luminousityAll)
        moistureAll = get_history(clientHistory, 'v3')
        firebase.post("/Moisture",  moistureAll)
        print("----------------------------")
        time.sleep(30)

        # Get last data from ada
        # temp = get_status(clientHistory, 'bbc-temp') 

        # Get data from firebase
        # rel = firebase.get("iotfarm-c345c-default-rtdb/Temperature",'')
        # print(rel)
    '''
# if __name__ == "__main__":
main()

   