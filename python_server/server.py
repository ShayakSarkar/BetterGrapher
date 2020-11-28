import flask
from flask import Flask

app=Flask(__name__)
if __name__=='__main__':
    @app.route('/edge_list',methods=['POST'])
    def edge_list_submission():
        res=flask.request.get_json(force=True)
        print(res)
        return {'name': 'Shayak'}
    @app.route('/')
    def index_view():
        res=flask.send_file('')
    @app.route('/<path:path>')
    def show_view():
        res=flask.send_file(path)
        return res
    
app.run(debug=True)