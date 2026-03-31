import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbCheck {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/foodnow_db";
        String user = "foodnow_user";
        String pass = "foodnow_pass";
        try {
            Connection conn = DriverManager.getConnection(url, user, pass);
            Statement stmt = conn.createStatement();
            
            System.out.println("--- TABLES IN DATABASE ---");
            ResultSet rs = stmt.executeQuery("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
            while (rs.next()) {
                System.out.println("TABLE: " + rs.getString("tablename"));
            }
            
            System.out.println("--------------------------");
            
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
