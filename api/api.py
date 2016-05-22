# -*- coding: utf-8 -*-

import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from contextlib import closing
import os

# setting
DATABASE = 'nikocale.db'
DEBUG = True
SECRET_KEY = 'development key'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('NIKOCALE_SETTINGS', silent=True)


'''
Database Setting
'''

# connect DB
def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

# init DB
def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

# before request
@app.before_request
def before_request():
    g.db = connect_db()

# adter request
@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

'''
View Setting
'''

@app.route('/', methods=['GET'])
def index():
    return "Hello"

def get_latest(name):
    cur = g.db.execute('select name, feeling from entries order by id desc')
    datas = [dict(name=row[0], feeling=row[1]) for row in cur.fetchall()]
    res = False
    for d in datas:
        if d['name'] == name:
            feeling = d["feeling"]
            res = {"name":name,"feeling":feeling}
    return res

@app.route('/get_feeling/<name>', methods=['GET'])
def get_feeling(name):
    res = get_latest(name)
    if res:
        return str(res)
    else:
        return str({"name":name,"feeling":False})

@app.route('/set_feeling/<name>/<feeling>', methods=['GET'])
def set_feeling(name,feeling):
    res = get_latest(name)
    if res:
        g.db.execute('UPDATE entries SET feeling=? WHERE name=?',(str(feeling), str(name)))
        g.db.commit()
        return "update new feeling"
    else:
        g.db.execute('insert into entries (name, feeling) values (?, ?)',[name, feeling])
        g.db.commit()
        return "add new feeling"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
