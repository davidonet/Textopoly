#!/usr/bin/python

from pymongo import Connection
connection = Connection('my.david-o.net')
db = connection.textopoly
db.authenticate('dataserver', '9ricer4')

import redis
r = redis.Redis(host='redis.david-o.net', port=6379, db=0)


def normalizePos():
    for t in db.txt.find():
        p = eval(str(t[u'p']))
        t[u'p'] = p
        db.txt.update({'_id': t[u'_id']}, t, False);
            
for t in db.txt.find():
    def addMsg(p):
        pos = "%d,%d" % (p[0], p[1])
        r.sadd("b", pos)
        pos = "%d,%d" % (p[0] + 1, p[1])
        r.sadd("b", pos)
        pos = "%d,%d" % (p[0], p[1] + 1)
        r.sadd("b", pos)
        pos = "%d,%d" % (p[0] + 1, p[1] + 1)
        r.sadd("b", pos)
    s = t[u's']
    p = t[u'p']
    addMsg(p)
    print "add blocks for : " + str(p[0]) + "," + str(p[1])
    if s == 'l' or s == 'f':
        print "Long or Fat block"
        l = p
        l[0] += 2
        addMsg(l)
    if s == 't' or s == 'f':
        print "Tall or Fat block"
        t = p
        t[1] += 2
        addMsg(t)
    if s == 'f':
        print "Fat block"
        f = p
        f[0] += 2
        f[1] += 2
        addMsg(f)
        
        
        
    
    
    
    
print "finish"    

   
    
