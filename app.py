from flask import Flask, render_template,Blueprint
from client import client
from admin import admin

app = Flask(__name__)

app.register_blueprint(client)
app.register_blueprint(admin)

if __name__ == '__main__':
	app.run(debug=True)