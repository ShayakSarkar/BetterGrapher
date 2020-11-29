#include "./adapters/CPPAdapter.cpp"
#include <sstream>
#include <iostream>

using std::cin;
using std::cout;
using std::endl;

void print_vector(std::vector<CPPAdapter::edge_details*>* v){
    cout<<"[";
    for(auto it=v->begin();it!=v->end();std::advance(it,1)){
        cout<<"(";
        cout<<*((*it)->to)<<","<<(*it)->weight<<"), ";
    }
    cout<<"]";
}

int main(){
    auto graph=CPPAdapter::get_graph();   
    for(auto it=graph->begin();it!=graph->end();std::advance(it,1)){
       cout<<it->first<<" ---> ";
       print_vector(graph->at(it->first)); 
       cout<<endl;
    }
}
