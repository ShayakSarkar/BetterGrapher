import flask

app=flask.Flask(__name__)


if __name__=='__main__':

    def write_to_file(data,file):
        data=data['graphData']
        print('WRITE_TO_FILE: file opened: ',file.name)
        print('WRITE_TO_FILE: writing',data['nodes'])
        buffer=''
        for node in data['nodes']:
            buffer+=node['data']+' '
        buffer+='\n'
        file.write(buffer)
        print('WRITE_TO_FILE: written ',buffer)
        buffer=''
        for edge in data['edgeList']:
            buffer+=str(edge['from'])+' '+str(edge['to'])+' '+str(edge['weight'])+'\n'
            if not edge['directed']:
                buffer+=str(edge['to'])+' '+str(edge['from'])+' '+str(edge['weight'])+'\n'
        file.write(buffer)
        print('WRITE_TO_FILE: written \n',buffer)
        buffer=''

    @app.route('/export_graph/',methods=['POST'])
    def export_graph_view():
        print('EXPORT_GRAPH: endpoint hit')
        #input()
        data=flask.request.get_json(force=True)
        print('EXPORT_GRAPH: got data from fontend',data)
        file=open('./GraphDetails.txt',"w+")
        write_to_file(data,file)
        file.close()
        return 'posted successfully'
    app.run(debug=True)
