import flask
from flask import Flask

app=Flask(__name__)
if __name__=='__main__':
    @app.route('/<path:path>')
    def show_view():
        res=flask.send_file(path)
        return res

app.run(debug=True)