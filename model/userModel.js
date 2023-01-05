const Database = require('./connection');

class UserModel extends Database {

    static async checkUser(email, password) {
        let sql = `select count(email) as count
                   from usermd3
                   where email = '${email}' and password = '${password}'`;
        let response = await this.run(sql);
        if (response != undefined) {
            let result = response[0].count;
            return result;
        } else {
            return 0;
        }
    }

    static async getUser(email) {
        let sql = `select *
                   from usermd3
                   where email = "${email}";`;
        let response = await this.run(sql);
        console.log(response)
        return response[0];
    }

    static async updateUserInfo(email, name, birthday, telephone, avatar) {
        let sql = `update usermd3
                   set name="${name}",
                       birthday="${birthday}",
                       telephone="${telephone}",
                       avatar="${avatar}"
                   where email = "${email}"`;
        await this.run(sql);
    }

    static async updateUserPassword(email, password) {
        let sql = `update usermd3
                   set password="${password}"
                   where email = "${email}"`;
        await this.run(sql);
    }

    static async signUp(user) {
        let sql = ` insert into usermd3 (name, birthday, email, password, telephone, avatar)
                    values ('${user.name}', '${user.birthday}', '${user.email}', '${user.password}', '${user.telephone}
                            ', '${user.avatar}')`
        await this.run(sql)
    }
    static search(search) {
        let connect = Database.run();
        let sql = `select *  from usermd3  WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, room) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(room);
                }
            })
        })
    }


}


module.exports = UserModel;