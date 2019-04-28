/**
 * Created by klaas on 16.10.16.
 */
var storage = require('./storage');
var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://tardis');

client.on('connect', function () {
    client.subscribe('/sportshub/cmd')
    client.subscribe('/sportshub/data')
})

client.on('message', function (topic, message) {
    // message is Buffer
    //console.log('Topic : ' + topic.toString());
    //console.log('Message ' + message.toString());
    if ('quit' === message.toString()) {
        console.log('Closing client')
        client.end()
    } else if ('/sportshub/data' === topic.toString()) {
        var data = message.toString().split(';');
        console.log(message.toString());
        storage.Entry.create({
            speed: data[2]/100,
            meter: data[3]/100,
            seconds: data[1],
            device: 'waterrower'
        }).then(function (entry) {
            // Wenn der Waterrower seine Messwerte an den Broker gesendet
            // hat, dann schickt dieser eine neue Message mit strukturierten
            // Informationen an den mqtt Server. Diese kann dann vom Application-
            // Server via WebSockets an die Clients gesendet werden.
            // Als Room kann dann das Device verwendet werden.
            let doc = {
                "device"  : entry.device,
                "speed"   : entry.speed,
                "meter"   : entry.meter,
                "seconds" : entry.seconds,
                "id"      : entry.id
            };

            client.publish('/sportshub/livedata', JSON.stringify(doc));            
        });
        
    } else if ('/sportshub/cmd' === topic.toString()) {
        console.log('CMD');
        console.log('Message ' + message.toString());
        //TODO: bei einer neuen Session wird ein Session Eintrag angelegt
        // und bei dem Ende einer Session wird ein Ende Session in der DB
        // abgelegt.
    }
})

/*
function sendEntry() {
    client.publish('/sportshub/cmd', 'Hello mqtt')
    client.publish('/sportshub/data', 'Hello mqtt')
    setTimeout(sendEntry,1000);
}
*/