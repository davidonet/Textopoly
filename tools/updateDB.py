#!/usr/bin/python

from pymongo import Connection
connection = Connection('dbserver')
db = connection.textopoly

import redis
r = redis.Redis(host='dbserver', port=6379, db=0)


def normalizePos():
    for t in db.txt.find():
        p = eval(str(t[u'p']))
        t[u'p'] = p
        db.txt.update({'_id': t[u'_id']}, t, False);

import copy

r.delete("b")
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
        l = copy.deepcopy(p)
        l[0] += 2
        print "Long or Fat block " + str(l)
        addMsg(l)
    if s == 't' or s == 'f':
        t = copy.deepcopy(p)
        t[1] += 2
        print "Tall or Fat block " + str(t)  
        addMsg(t)
    if s == 'f':
        f = copy.deepcopy(p)
        f[0] += 2
        f[1] += 2
        print "Fat block " + str(f)
        addMsg(f)
        
        
        
    
    
    
    
print "finish"    

   
    
