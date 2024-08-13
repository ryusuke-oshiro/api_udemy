const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());

app.listen(PORT, () => console.log("サーバーが起動しました。"));

app.get("/", (req, res) => {
    res.send("制作中")
});

//疑似データ
const customers = [
    {title: "田中", id:1},
    {title: "斎藤", id:2},
    {title: "橋本", id:3},
    {title: "鈴木", id:4},
    {title: "安藤", id:5},
];

//下のエンドポイントに、ゲットメソッドを作成した。
app.get("/api/customers", (req, res) => {
    res.send(customers);
});

//customerのいるエンドポイントに、新たに追加するpostメソッドを追加した
app.post("/api/customers", (req, res) => {
    const customer = {
        title : req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customer);
});

//customerのいるエンドポイントに、/:id（任意のid）に対して更新をかける
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});


app.delete("/api/customers/:id", (req, res) => {
    //データからリクエストされたidと同じものをとってくる
    const customer = customers.find((c) => c.id === parseInt(req.params.id));

    //customerは配列customersの中で何番目の要素なのかをとってくる
    const index = customers.indexOf(customer);

    //配列customersから削除する
    customers.splice(index, 1);

    res.send(customer);
});