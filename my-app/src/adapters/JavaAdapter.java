package adapters;
import java.util.*;
import java.io.*;

public class JavaAdapter{
    public static HashMap<Integer,LinkedList<Integer>> getGraphInt()throws FileNotFoundException{
        File fileObj=new File("./GraphData.txt");
        Scanner in=new Scanner(fileObj);
        String line=in.nextLine();
        System.out.println(line);
        in.close();
        return new HashMap<Integer,LinkedList<Integer>>();
    }
    public static void main(String args[]){
        try{
            getGraphInt();
        }
        catch(Exception e){
            System.out.println("Error ... file not found");
        }
    }
}