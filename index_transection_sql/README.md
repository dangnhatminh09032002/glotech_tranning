# **Index in postgresql**

## **Impact of Indexes** (tác động của chỉ mục)

EXPLAIN ANALYZE : thay vì trả về kết quả khi truy vấn thì thuộc tính này sẽ trả về thông tin của truy vấn.

Format :

```
EXPLAIN [ ( option [, ...] ) ] statement
EXPLAIN [ ANALYZE ] [ VERBOSE ] statement
```

where option can be one of:

```
ANALYZE [ boolean ]
VERBOSE [ boolean ]
COSTS [ boolean ]
BUFFERS [ boolean ]
FORMAT { TEXT | XML | JSON | YAML }
```

Example :

```
EXPLAIN ANALYZE
SELECT *
FROM user
```

## **How to create a index**

```
CREATE INDEX index_name 
ON table_name [USING method] (indexed_column);
```

Index có thể giúp bạn truy vấn nhanh hơn tuy nhiên nếu ta thêm, sửa, xóa nó sẽ lâu hơn vì lúc đó nó cần phải cập nhật lại index. Và nó cũng sẽ nặng hợn vì nó phải chứa thêm một cột để lưu giá trị của index.

**Index filtering** : lọc chỉ mục

## **Database Size**

Trong PostgreSQL, để xem kích thước của cơ sở dữ liệu, bạn có thể sử dụng pg_size_pretty và pg_total_relation_size.

Đây là một lệnh hữu ích để sử dụng trước và sau khi tạo chỉ mục để xem chỉ mục đang sử dụng bao nhiêu dung lượng.

```
SELECT pg_size_pretty (pg_total_relation_size('<table_name>'));
```

### The pg_index Table

- Trong PostgreSQL, bảng pg_indexes chứa thông tin về những chỉ mục nào tồn tại trên bảng pg_indexes có thể được truy vấn giống như bất kỳ bảng nào khác.

    ```
    SELECT *
    FROM pg_indexes
    WHERE tablename = '<table_name>';
    ```

### Indexes with WHERE

- Các chỉ mục được máy chủ cơ sở dữ liệu sử dụng để tăng tốc độ khi thực hiện tìm kiếm các bản ghi cụ thể. Điều này thường được sử dụng trong các mệnh đề **WHERE** và khi hai bảng được nối với nhau trên các mệnh đề **ON** của chúng.

    ```
    SELECT * FROM customers WHERE last_name = 'Jones';
    ```

### Indexes and Primary Keys

- Trong PostgreSQL, khi khóa chính được tạo trên bảng, máy chủ cơ sở dữ liệu sẽ tự động tạo Chỉ mục duy nhất trên bảng đó.

    ````
    -- Assuming there is a customers table with a customer_id field, this will __ create an index on customer_id.

    ALTER TABLE customers ADD PRIMARY KEY (customer_id);
    ````

## **Clustered Indexes**

- Cơ sở dữ liệu PostgreSQL có thể có hai loại chỉ mục - nhóm và không nhóm.

- Tuy nhiên, một bảng chỉ có thể có một chỉ mục được nhóm. Chỉ mục này thay đổi về mặt vật lý việc lưu trữ dữ liệu trong bộ nhớ dài hạn trong khi chỉ mục không phân cụm là một tổ chức riêng biệt tham chiếu trở lại dữ liệu ban đầu.

    - Các chỉ mục được phân cụm phải được khai báo rõ ràng trong trường hợp của Postgres.
    - Được tạo khi bảng được tạo.
    - Sử dụng khóa chính được sắp xếp theo thứ tự tăng dần.

## **Non-Clustered Indexes**

Trong PostgreSQL, một bảng có thể có nhiều chỉ mục không phân cụm. Các chỉ mục này tạo (các) khóa và một con trỏ quay lại bảng nơi có thể tìm thấy phần thông tin còn lại.

- ### Partial Indexes (Chỉ mục một phần)

    - PostgreSQL cho phép lập chỉ mục trên một tập hợp con của bảng bằng mệnh đề **WHERE**. Chúng được gọi là Chỉ mục từng phần.

        ```
        CREATE INDEX <index_name>
        ON <table_name> (<column>)
        WHERE <condition>;
        ```

- ### The CLUSTER Keyword

    - Trong PostgreSQL, **CLUSTER** từ khóa có thể được sử dụng để tạo một chỉ mục nhóm mới trên một bảng hoặc thu thập lại một bảng đã được thiết lập với một chỉ mục.

        ````
        -- Defining which existing index should be used as the clustered index for a given table
        CLUSTER products USING products_product_name_idx;
        
        
        -- Clustering a single table
        CLUSTER products;
        
        -- Clustering all tables in the database
        CLUSTER;
        ````

- ### Avoiding Secondary Lookup

    - Trong PostgreSQL, nếu tất cả các cột đang được sử dụng trong một truy vấn là một phần của chỉ mục, thì không có tra cứu thứ cấp nào được thực hiện.

        ```

        CREATE INDEX customers_last_name_first_name_email_address_idx 
        ON customers (last_name, first_name, email_address);
        
        -- Because the three columns used in the query are in the index, no secondary lookup needs to happen.
        SELECT first_name, last_name, email_address
        FROM customers
        WHERE last_name = 'Minh';
        ```

## **Ordered Indexes**

PostgreSQL có thể sử dụng các chỉ mục để trả về kết quả theo thứ tự mà không cần một bước riêng biệt để sắp xếp. Điều này được thực hiện bằng cách chỉ định thứ tự ( ASC hoặc DESC) bạn muốn chỉ mục ở trong khi bạn tạo chỉ mục.

```
-- Ascending order
CREATE INDEX <index_name> ON <table_name> (<column_name> ASC)
```

## **Combining Indexes**

PostgreSQL có thể sử dụng nhiều chỉ mục cùng nhau trong một truy vấn duy nhất. Việc này được thực hiện tự động bởi hệ thống. Một kỹ sư cơ sở dữ liệu phải cân nhắc xem có nên tạo nhiều chỉ mục đơn được kết hợp, chỉ mục đa cột hay tất cả các kết hợp của chỉ mục đơn và đa cột.

```
-- Option one - one index on both columns
CREATE INDEX customers_last_name_first_name_idx ON customers (last_name, first_name);
 
-- Option two - two indexes. One on each column
CREATE INDEX customers_last_name_idx ON customers (last_name);
CREATE INDEX customers_first_name_idx ON customers (first_name);
```

- ### Indexes With Functions

    - Chỉ mục cột không chỉ giới hạn ở một tham chiếu cột, nó cũng có thể là một hàm hoặc biểu thức vô hướng được tính từ một hoặc nhiều cột.

        ```
        -- This uses the LOWER function to ensure only one value of a string can be added to a table, regardless of capitalization. i.e 'name@test.com' and 'NAME@test.com' will be considered the same email address.

        CREATE UNIQUE INDEX customers_email_address_lower_unique_idx 
        ON customers(LOWER(email_address));
        ```

# **Transaction in postgresql**

Một transaction trong PostgreSQL là một giao dịch (phiên làm việc) xử lý tổ hợp nhiều lệnh SQL cùng một lúc. Nếu chương trình có vấn đề hoặc lỗi trong xử lý nó sẽ gọi ROLLBACK để hủy quá trình thực hiện. Lúc đó dữ liệu trong database sẽ không thay đổi.

Transaction đảm bảo tính toàn vẹn của dữ liệu.

## **Command in transaction**
- Các lệnh cơ bản
    - [ BEGIN TRANSACTION | BEGIN ] : Để bắt đầu một Transaction
    - [ COMMIT TRANSACTION | BEGIN | END TRANSACTION ] : Để lưu các thay đổi vào database.
    - [ ROLLBACK TRANSACTION | ROLLBACK ] : Hủy transaction và không thay đổi dữ liệu trong database.
    - [ SAVEPOINT savepoint_name ] : Dùng để tạo một điểm lưu
        ```
        -- Sẽ quay lại vị trí đã point
        ROLLBACK TO savepoint_name
        ```
    - [ RELEASE SAVEPOINT savepoint_name ] : Hủy một point
    - Nếu các point cùng tên nó sẽ lấy point gần nhất
- Transaction chỉ được sử dụng với các lệnh DML là: INSERT, UPDATE, DELETE.
    
## **Transaction Isolation Levels**

- ### 4 read phenomena
    - **Dirty read** : Nó xảy ra khi một giao dịch đọc dữ liệu được ghi bởi giao dịch đồng thời khác chưa được cam kết. Điều này thật tồi tệ, bởi vì chúng tôi không biết liệu giao dịch khác cuối cùng sẽ được cam kết hay quay trở lại. Vì vậy, chúng tôi có thể kết thúc bằng cách sử dụng dữ liệu không chính xác trong trường hợp khôi phục xảy ra.
    - **non-repeatable read** : Khi một giao dịch đọc cùng một bản ghi hai lần và thấy các giá trị khác nhau, vì hàng đã được sửa đổi bởi giao dịch khác đã được cam kết sau lần đọc đầu tiên.
    - **Phantom read** : Là một hiện tượng tương tự, nhưng ảnh hưởng đến các truy vấn tìm kiếm nhiều hàng thay vì một hàng. Trong trường hợp này, cùng một truy vấn được thực thi lại, nhưng một tập hợp các hàng khác được trả lại, do một số thay đổi được thực hiện bởi các giao dịch khác được cam kết gần đây, chẳng hạn như chèn các hàng mới hoặc xóa các hàng hiện có thỏa mãn điều kiện tìm kiếm của truy vấn của giao dịch hiện tại.
    - **Serialization anomaly** : Khi kết quả của một nhóm các giao dịch được cam kết đồng thời không thể đạt được nếu chúng ta cố gắng chạy chúng tuần tự theo bất kỳ thứ tự nào mà không chồng chéo nhau.

- ### 4 standard isolation level ( low -> hight )
    - **Read uncommitted** : Có thể thấy dữ liệu được ghi bởi giao dịch không cam kết.
    - **Read committed** : Chỉ xem dữ liệu được ghi bởi giao dịch đã cam kết.
    - **Repeatable read** : Cùng một truy vấn đọc luôn trả về cùng một kết quả.
    - **Serializable** : Có thể đạt được kết quả tương tự nếu thực hiện các giao dịch nối tiếp theo một số thứ tự thay vì đồng thời.
```
-- Dùng để hiển thị mức độ transection
SELECT @@transaction_isolation
```

```
-- Dùng để thay đổi mức độ transection
SET SESSION TRANSACTION ISOLATION LEVEL <level>
```

- Tuy nhiên trong postgresql thì **Read uncommitted** không hoạt động và mặc định sẽ là **Read committed**.

## **How to use transaction isolation properly?**

| phenomena \ isolation | Read uncommitted | Read committed | Repeatable read | Serializable |
| ---                   | ---              |  ---           | ---             | ---          | 
| Dirty read            | [x]              | [x]            | [x]             | [x]          |
| Non-repeatable read   |                  | [x]            | [x]             | [x]          |
| Phantom read          |                  |                | [x]             | [x]          |
| Serialization anomaly |                  |                |                 | [x]          |