import flask

app=flask.Flask(__name__)

if __name__=='__main__':
    @app.route('/export_graph/',methods=['POST'])
    def export_graph_view():
        print('EXPORT_GRAPH: endpoint hit')
        #input()
        data=flask.request.get_json(force=True)
        print(data)
        return 'ola'
    app.run(debug=True)
