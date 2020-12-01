import java.util.HashMap;
import java.util.Vector;

import adapters.JavaAdapter;
public class test {
    public static void printGraph(HashMap<String,Vector<JavaAdapter.EdgeDetails>> hm){
        for(String key : hm.keySet()){
            System.out.println(key+" ---> "+hm.get(key));
        }
    }
    public static void main(String args[]){
        HashMap<String,Vector<JavaAdapter.EdgeDetails>> graph=JavaAdapter.getGraph();
        printGraph(graph);
    }    
}
