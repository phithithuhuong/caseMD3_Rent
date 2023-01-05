const Database = require('./connection');
const {raw} = require("mysql");

class RoomModel extends Database {

    static async getRooms() {

        let sql = `select roommd3.rID,
                          roommd3.status,
                          roommd3.type,
                          roommd3.price,
                          roommd3.name,
                          roommd3.image,
                          rentmd3.checkIn,
                          rentmd3.checkout

                   from roommd3
                            left join rentmd3 on roommd3.rID = rentmd3.rID
                            join (select roommd3.rID, max(rentmd3.checkIn) checkIn
                                  from roommd3
                                           left join rentmd3 on roommd3.rID = rentmd3.rID
                                  group by roommd3.rID) as latest
                                 on rentmd3.rID = latest.rID and rentmd3.checkIn = latest.checkIn
                   where roommd3.usable = '1'
                   union
                   select roommd3.rID,
                          roommd3.status,
                          roommd3.type,
                          roommd3.price,
                          roommd3.name,
                          roommd3.image,
                          rentmd3.checkIn,
                          rentmd3.checkout
                   from roommd3
                            left join rentmd3 on roommd3.rID = rentmd3.rID
                   where roommd3.rID not in (select rID from rentmd3)
                     and roommd3.usable = '1'`;
        let result = await this.run(sql);
        console.log(result);
        return result;
    }

    static async deleteRoom(rID) {
        let sql = `delete
                   from roommd3
                   where rID = ${rID}`;
        await this.run(sql);
    }

    static async addRoom(name, type, price, image) {
        let sql = `insert into roommd3 (name, type, price, image)
                       value ("${name}", "${type}", ${price}, "${image ? image : ''}");`
        await this.run(sql);
    }

    static async getRoomByID(id) {
        let sql = `select name, type, price, image
                   from roommd3
                   where rID = ${id}`;
        let room = await this.run(sql);
        return room;
    }

    static async updateRoomInfo(rID, name, type, price, image) {
        let sql = `update roommd3
                   set name  = "${name}",
                       type  = "${type}",
                       price = ${price},
                       image = "${image}"
                   where rID = ${rID}`;
        await this.run(sql);
    }

    static async updateStatus(rID, status) {
        let sql = `update roommd3
                   set status = "${status}"
                   where rID = "${rID}"`;
        await this.run(sql);
    }

    static async search(search) {
        let sql = `select *
                   from roommd3
                   WHERE name LIKE '%${search}%'`
        return await this.run(sql)
    }

}

module.exports = RoomModel;