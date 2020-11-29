# BetterGrapher
Helps in making graphs for practicing graph theory or testing graph theory algorithms easier 
through the use of a GUI

## Instructions
  1. **Dependencies**
      ** npm
      ** flask
  2. **Procedure**
      ** Clone the repo
      ** Go to the folder *BetterGrapher/my-app/*
      ** start the static server as *npm start*
      ** Go to the folder *BetterGrapher/server/*
      ** start the python server as *python3 server.py*
      ** create the graph using the GUI on chrome
      ** click on the *export* button
  3. **Language Support**
      ** Currently the app supports three languages Python3, Java and C++
      ** You can write your programs in the */BetterGrapher/my-app/src/workspace* folder
      ** for Python3 write the following to get the graph
        ```python
          from adapters.GraphAdapter import graph
        ```
        This should make the adjacency list version of the graph available through the variable *graph*
      
      ** for Java write the following to get the graph
        ```java
        import java.util.*;
        import adapters.JavaAdapter;
        public class Main{
          public static void anyFunction(){
            HashMap<String,Vector<JavaAdapter.EdgeDetails>> graph=JavaAdapter.getGraph();
          }
        ```
      ** for C++ write the following to get the graph
        ```cpp
        #include <unordered_map>
        #include <vector>
        #include "./adapters/CPPAdapter"
        int main(){
          auto graph=CPPAdapter::get_graph();
        }
        ```
      
      
