const BaseController = require('./baseController.js');
const RoomModel = require("../model/roomModel");
const navbarRent = require("../view/navbarRent");
const url = require("url");
const qs = require("qs");

class RentController extends BaseController {
    static view = async (req, res) => {
        let dataHTML = await this.readFile('./view/rent/rent.html');
        let rentHTML = '';
        let rooms = await RoomModel.getRooms();
        rooms.forEach((item) => {
            rentHTML +=

               ` <div class="card" style="width: 30rem;">
  <img class="card-img-top" <img src="${item.image}"  alt="Card image cap">
  <div class="card-body">
  <h4 style="color: #0076bd">${item.name}</h4>
  <p style="color:red ">${item.price}.000$/month</p>
  <h5 style="color: darkslategray"> Type : ${item.type}</h5>
  <p style="color: limegreen">Status : ${item.status}</p>
   <a href="/room/update?rID=${item.rID}">
                            <button type="button" onclick="return confirm('Do you want to rent ?')" class="btn btn-outline-success" >Checkbox</button>
                        </a>
  </div>
</div>

`
        });
        res.writeHead(200, 'Content-Type', 'text/html');
        dataHTML = dataHTML.replace('<tbody></tbody>', rentHTML);
        dataHTML = dataHTML.replace('<nav></nav>', navbarRent);
        res.write(dataHTML);
        res.end();
    }
    static update = async (req, res) => {
        let rID = qs.parse(url.parse(req.url).query).rID;
        if (req.method === "GET") {

            let room = (await RoomModel.getRoomByID(rID))[0];
            console.log(room);
            let dataHTML = await this.readFile('./view/rent/checkbox.html');
            res.writeHead(200, 'Content-Type', 'text/html');
            res.write(dataHTML);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                let room = qs.parse(data);
                console.log(room);
                RoomModel.updateStatus(rID, room.status = 'Hired');
                res.writeHead(301, {Location: '/rent'});
                res.end();
            })
        }

    }

    static search = (req, res) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', async () => {
            let search = qs.parse(data);
            console.log(search.search);
            let dataHTML = await this.readFile('./view/rent/rent.html');
            let rentHTML = '';
            let rooms = await RoomModel.search(search.search)
            rooms.forEach((item) => {
                rentHTML +=
                    `<tr style="background-color: lightgoldenrodyellow">
                <td> ${item.rID} </td>
                <td> <img src="${item.image}" class="modal-sm" alt="image"/>  </td>
                <td><b>${item.name}</b></td>
               
                <td>${item.status}</td>
                <td style="color: red">${item.price}.000$/month</td>
                <td style="color: forestgreen">${item.type}</td>
             
                <td> 
                    ${item.checkIn ? item.checkIn.toLocaleTimeString() : ''}<br>
                    ${item.checkIn ? item.checkIn.toLocaleDateString() : ''}
                </td>
                <td> 
                    ${item.checkout ? item.checkout.toLocaleTimeString() : ''}<br>
                    ${item.checkout ? item.checkout.toLocaleDateString() : ''}
                </td>
              
                
                <td>
                 <button type="button" class="btn btn-outline-success">
                 <a href="">Checkbox</a></button>
                </td>
            </tr>`
            });
            res.writeHead(200, 'Content-Type', 'text/html');
            dataHTML = dataHTML.replace('<tbody></tbody>', rentHTML);
            dataHTML = dataHTML.replace('<nav></nav>', navbarRent);
            res.write(dataHTML);
            res.end();
        })
    }


}

module.exports = RentController