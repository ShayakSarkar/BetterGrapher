def create_graph(file):
    mapping=dict()  #mapping from node ids to list of (neighbour, weight) tuples
    nodes=file.readline().split(' ')
    for node in nodes:
        node=node.strip()
        if node!='':
            mapping[node]=[]
    
    edge_string=file.readline()
    
    while(edge_string!=''):
        edge_string=edge_string.strip()
        if(edge_string!=''):
            edge_details=edge_string.split(' ')
            src=edge_details[0]
            dest=edge_details[1]
            weight=int(edge_details[2])
            mapping[src].append((dest,weight))
        edge_string=file.readline()
    
    return mapping

file=open('../server/GraphDetails.txt','r')
graph=create_graph(file)
#print(graph)
