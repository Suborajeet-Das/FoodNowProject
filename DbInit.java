import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbInit {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/foodnow_db";
        String user = "foodnow_user";
        String pass = "foodnow_pass";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {

            System.out.println("Dropping broken schema...");
            stmt.execute("DROP TABLE IF EXISTS order_items CASCADE");
            stmt.execute("DROP TABLE IF EXISTS food_orders CASCADE");
            stmt.execute("DROP TABLE IF EXISTS item CASCADE");
            stmt.execute("DROP TABLE IF EXISTS users CASCADE");
            stmt.execute("DROP TABLE IF EXISTS canteen CASCADE");

            System.out.println("Rebuilding tables...");
            stmt.execute("CREATE TABLE canteen (id BIGSERIAL PRIMARY KEY, name VARCHAR(255), location VARCHAR(255))");
            stmt.execute("CREATE TABLE users (id BIGSERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, full_name VARCHAR(255) NOT NULL, role VARCHAR(50) NOT NULL, canteen_id BIGINT REFERENCES canteen(id))");
            stmt.execute("CREATE TABLE item (id BIGSERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description VARCHAR(255), price DECIMAL(10,2) NOT NULL, image_url VARCHAR(255), quantity_available INTEGER NOT NULL, is_active BOOLEAN, canteen_id BIGINT NOT NULL REFERENCES canteen(id))");
            stmt.execute("CREATE TABLE food_orders (id BIGSERIAL PRIMARY KEY, status VARCHAR(50) NOT NULL, total_price DECIMAL(10,2) NOT NULL, created_at TIMESTAMP NOT NULL, user_id BIGINT NOT NULL REFERENCES users(id), canteen_id BIGINT NOT NULL REFERENCES canteen(id))");
            stmt.execute("CREATE TABLE order_items (id BIGSERIAL PRIMARY KEY, quantity INTEGER NOT NULL, unit_price DECIMAL(10,2) NOT NULL, item_id BIGINT NOT NULL REFERENCES item(id), order_id BIGINT NOT NULL REFERENCES food_orders(id))");

            System.out.println("Seeding data...");
            stmt.execute("INSERT INTO canteen (name, location) VALUES ('Main Canteen', 'Block A')");
            stmt.execute("INSERT INTO users (email, password, full_name, role) VALUES ('student@foodnow.com', '123', 'Jane Student', 'STUDENT')");
            stmt.execute("INSERT INTO item (name, price, quantity_available, is_active, canteen_id) VALUES ('Deluxe Thali', 60.00, 50, true, 1), ('Masala Chai', 12.00, 100, true, 1), ('Crispy Samosa', 20.00, 60, true, 1), ('Chocolate Cake', 45.00, 25, true, 1)");

            System.out.println("--- SUCCESSFULLY INITIALIZED DB SCHEMA AND SEED DATA! ---");
        } catch (Exception e) {
            System.err.println("DB INIT ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
