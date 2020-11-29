package adapters;
import java.util.Scanner;
import java.util.Vector;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;

public class JavaAdapter{
    public static class EdgeDetails {
        public String to;
        public int weight;

        public EdgeDetails(String to, int weight) {
            this.to = to;
            this.weight = weight;
        }
        public String toString(){
            return "("+this.to+","+this.weight+")";
        }
    }
    private JavaAdapter(){
    }
    public static HashMap<String,Vector<EdgeDetails>> getGraph(){
        HashMap<String,Vector<EdgeDetails>> hm=new HashMap<>();
        try{    
            File f=new File("../server/GraphDetails.txt");
            Scanner fileScanner=new Scanner(f);
            String line=fileScanner.nextLine();
            String[] ids=line.split(" ");
            for(int i=0;i<ids.length;i++){
                hm.put(ids[i],new Vector<EdgeDetails>());
            }   
            while(fileScanner.hasNextLine()){
                line=fileScanner.nextLine();
                String[] tokens=line.split(" ");
                String from=tokens[0];
                String to=tokens[1];
                int weight=Integer.parseInt(tokens[2]);
                hm.get(from).add(new EdgeDetails(to,weight));
            }
        }
        catch(FileNotFoundException e){
            System.out.println("Error in Adapter ... GraphDetails.txt not found in server folder");
            System.out.println(e.getMessage());
        }
        return hm;
    }
}