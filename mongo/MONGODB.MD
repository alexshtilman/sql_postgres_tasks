# https://university.mongodb.com/

```bash
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"
```

```bash
mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json
```

```bash
mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop dump
```

```bash
mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
```

```bash
show dbs

use sample_training

show collections

db.zips.find({"state": "NY"})

db.zips.find({"state": "NY"}).count()

db.zips.find({"state": "NY", "city": "ALBANY"})

db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()

db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
                       { "_id": 3, "test": 3 }])

db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
{ "_id": 3, "test": 3 }],{ "ordered": false })

db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })
db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })

db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()

db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
              }).count()

db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
              }).count()

db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
                         { "$eq": [ "$end station id", "$start station id" ]}
                       ]}}).count()

db.listingsAndReviews.find({ "amenities": {
                                  "$size": 20,
                                  "$all": [ "Internet", "Wifi",  "Kitchen",
                                           "Heating", "Family/kid friendly",
                                           "Washer", "Dryer", "Essentials",
                                           "Shampoo", "Hangers",
                                           "Hair dryer", "Iron",
                                           "Laptop friendly workspace" ]
                                         }
                            }).pretty()

use sample_training

db.trips.findOne({ "start station location.type": "Point" })

db.companies.find({ "relationships.0.person.last_name": "Zuckerberg" },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": { "$regex": "CEO" } },
                  { "name": 1 }).count()


db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": {"$regex": "CEO" } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).count()

use sample_training

db.trips.find({ "birth year": 1989 })

db.trips.find({ "start station id": 476 }).sort( { "birth year": 1 } )

db.trips.createIndex({ "birth year": 1 })

db.trips.createIndex({ "start station id": 476, "birth year": 1 })

db.iot.updateOne({ "sensor": r.sensor, "date": r.date,
                   "valcount": { "$lt": 48 } },
                         { "$push": { "readings": { "v": r.value, "t": r.time } },
                        "$inc": { "valcount": 1, "total": r.value } },
                 { "upsert": true })
```

## mongodb administration

```bash
use admin
db.shutdownServer()
exit

mongod --bind_ip 123.123.123.123
mongod --auth

mongod --dbpath /data/db --logpath /data/log/mongod.log --fork --replSet "M103" --keyFile /data/keyfile --bind_ip "127.0.0.1,192.168.103.100" --tlsMode requireTLS --tlsCAFile "/etc/tls/TLSCA.pem" --tlsCertificateKeyFile "/etc/tls/tls.pem"

```

```yml
storage:
  dbPath: "/data/db"
systemLog:
  path: "/data/log/mongod.log"
  destination: "file"
replication:
  replSetName: M103
net:
  bindIp: "127.0.0.1,192.168.103.100"
tls:
  mode: "requireTLS"
  certificateKeyFile: "/etc/tls/tls.pem"
  CAFile: "/etc/tls/TLSCA.pem"
security:
  keyFile: "/data/keyfile"
processManagement:
  fork: true
security:
    authorization: enabled
```

```bash
mongo admin --host localhost:27000 --eval '
  db.createUser({
    user: "m103-admin",
    pwd: "m103-pass",
    roles: [
      {role: "root", db: "admin"}
    ]
  })
'
```

```bash
db.runCommand(
  { "createIndexes": <collection> },
  { "indexes": [
    {
      "key": { "product": 1 }
    },
    { "name": "name_index" }
    ]
  }
)
```

```bash
mongo admin --host 192.168.103.100:27000 -u m103-admin -p m103-pass --eval '
  db.getLogComponents()

mongo admin --host 192.168.103.100:27000 -u m103-admin -p m103-pass --eval '
  db.setLogLevel(0, "index")
'

tail -f /data/db/mongod.log
'
```

```bash
mongo newDB --host 192.168.103.100:27000 -u m103-admin -p m103-pass --authenticationDatabase admin --eval '
  db.getProfilingLevel()
  db.setProfilingLevel(1)
  db.setProfilingLevel( 1, { slowms: 0 } )
  db.system.profile.find().pretty()
'
```

```bash
db.createUser(
  { user: "security_officer",
    pwd: "h3ll0th3r3",
    roles: [ { db: "admin", role: "userAdmin" } ]
  }
)
db.grantRolesToUser( "dba",  [ { db: "playground", role: "dbOwner"  } ] )

db.createUser(
  { user: "m103-application-user",
    pwd: "m103-application-pass",
    roles: [ { db: "applicationData", role: "readWrite" } ]
  }
)

Role: readWrite on applicationData database
Authentication source: admin
Username: m103-application-user
Password: m103-application-pass
```

```bash

mongodump --help
mongodump --port 30000 --db applicationData --collection products
ls dump/applicationData/
cat dump/applicationData/products.metadata.json

mongoexport --help
mongoexport --port 30000 --db applicationData --collection products
mongoexport --port 30000 --db applicationData --collection products -o products.json

mongoimport --port 30000 products.json

```

## replication

```yml
#(node2,node3)
storage:
  dbPath: /var/mongodb/db/node1
net:
  bindIp: 192.168.103.100,localhost
  port: 27011
security:
  authorization: enabled
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example
```

```bash
sudo mkdir -p /var/mongodb/pki/
sudo chown vagrant:vagrant /var/mongodb/pki/
openssl rand -base64 741 > /var/mongodb/pki/m103-keyfile
chmod 400 /var/mongodb/pki/m103-keyfile

mongod -f node2.conf
mongod -f node3.conf

use admin
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})
#hostname:port!
rs.add("m103-repl:27002")
rs.add("m103-repl:27003")


exit
mongo --host "m103-example/192.168.103.100:27011" -u "m103-admin"
mongo --host "m103-repl/localhost:27004"  -u m103-admin -p m103-pass --authenticationDatabase admin
-p "m103-pass" --authenticationDatabase "admin"

#status node
rs.status()
rs.isMaster()
db.serverStatus()['repl']
rs.printReplicationInfo()
#demote node
rs.stepDown()

rs.add("m103:27014")
rs.addArb("m103:28000")

```

## logs

```js
var stats = db.oplog.rs.stats();
rs.printReplicationInfo();
```

## reconfig

```js
cfg = rs.conf();
cfg.members[3].votes = 0;
cfg.members[3].hidden = true;
cfg.members[3].priority = 0;
rs.reconfig(cfg);
//enable read from slaves
rs.slaveOk();
```

## sharding

```yaml
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26001
systemLog:
  destination: file
  path: /var/mongodb/db/csrs1.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs1
```

```bash
mongod -f csrs_1.conf
mongod -f csrs_2.conf
mongod -f csrs_3.conf
mongo --port 26001

```

```js
rs.initiate()
use admin
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})
db.auth("m103-admin", "m103-pass")
rs.add("192.168.103.100:26002")
rs.add("192.168.103.100:26003")
```

### mongos

```yml
sharding:
  configDB: m103-csrs/192.168.103.100:26001,192.168.103.100:26002,192.168.103.100:26003
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26000
systemLog:
  destination: file
  path: /var/mongodb/db/mongos.log
  logAppend: true
processManagement:
  fork: true
```

```bash
mongos -f mongos.conf
sh.status()
```

Update node conf:

```yml
sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node1
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: 192.168.103.100,localhost
  port: 27011
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-repl
```

```bash
#then shutdown servers
use admin
db.shutdownServer()

#then
rs.stepDown() primary
sh.addShard("shard1/localhost:27001,localhost:27002,localhost:27003")
```

## enable sharding

```js
sh.enableSharding("m103");
db.products.createIndex({ sku: 1 });
sh.shardCollection("m103.products", { sku: 1 });
```

mongoimport --db=m103 --host localhost --port 26000 -u m103-admin -p m103-pass --collection=products --authenticationDatabase admin --file=/dataset/products.json

mongo --host "localhost:26000" -u m103-admin -p m103-pass --authenticationDatabase admin

mongoimport /dataset/products.part2.json --port 26000 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin" --db m103 --collection products

## chunks

```js
use config
db.settings.save({_id: "chunksize", value: 2})
```

## shard chunks balancer

```js
sh.startBalancer(timeout, interval);
sh.stopBalancer(timeout, interval);
sh.setBalancerState(boolean);
```
