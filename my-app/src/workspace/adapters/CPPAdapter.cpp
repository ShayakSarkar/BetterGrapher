#include <iostream>
#include <unordered_map>
#include <vector>
#include <fstream>
#include <sstream>

using std::cin;
using std::cout;
using std::endl;

namespace CPPAdapter{
    class edge_details{
        public:
            std::string* to;
            int weight;
            edge_details(std::string* to,int weight){
                this->to=to;
                this->weight=weight;
            }
            void display(){
                cout<<"to: "<<this->to<<endl<<"weight: "<<this->weight<<endl;
            }
            ~edge_details(){
                delete this->to;
            }
    };
    std::unordered_map<std::string,std::vector<edge_details*>*>* get_graph(){
        auto mapping=new std::unordered_map<std::string,std::vector<edge_details*>*>();
        auto buffer=new std::string();
        auto file=new std::ifstream("../server/GraphDetails.txt");
        if(file==nullptr){
            std::cout<<"GET_GRAPH: error, file does not exist probably"<<std::endl;
            file->close();
            delete file,buffer;
            return nullptr;
        }   
        getline(*file,*buffer);
        auto stream=new std::stringstream(*buffer);
        while(true){
            auto id=new std::string();
            *id="";
            *stream>>*id;
            if(*id==""){
                break;
            }
            mapping->insert({*id,new std::vector<edge_details*>()});
        }
        while(true){
            *buffer="";
            getline(*file,*buffer);
            if(*buffer==""){
                //cout<<"finished reading"<<endl;
                break;
            }
            auto stream=new std::stringstream(*buffer);
            auto from=new std::string();
            auto to=new std::string();
            int weight;
            getline(*stream,*from,' ');
            getline(*stream,*to,' ');
            *stream>>weight;
            auto edge=new edge_details(to,weight);
            mapping->at(*from)->push_back(edge);
            delete stream,from;
        }
        return mapping;
    }
};


