# How to Database setting

## cf.URL

- http://o-tomox.hatenablog.com/entry/2013/11/29/183027

## flow

- execute this command

~~~
$ sqlite3 flaskr.db < schema.sql
~~~

- init database

~~~
$ python
>>> from api import init_db
>>> init_db()
~~~
