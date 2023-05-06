import sys
from Adafruit_IO import MQTTClient
import time
import random
FEED_LST = ["V16","V1","V2","V3","V4","V10","V11","V14"]
USERNAME = "IOTFarm_222"
KEY = "aio_buBA10Z4d41wOJwo3tPbBR7VP4zU"
stat=0
def connected(client:MQTTClient):
    for i in FEED_LST:
        try:
            client.subscribe(i)
            print("Success")
        except: print("Failed to connect to "+i)
        

# def subscribe(client , userdata , mid , granted_qos):
#     print("Subscribe thanh cong ...")

def disconnected(client):
    print("Disconnect")
    sys.exit (1)

def message(client , feed_id , payload):
    global stat
    print("Data received from " +feed_id+': '+ payload)
    if feed_id=="V16":
        stat=payload   #data duoc luu trong bien stat
    elif feed_id=="V1":
        client.publish("V16",max(int(stat),1))

client = MQTTClient(USERNAME , KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
# client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    time.sleep(10)
    # client.publish("V1",40)
    pass