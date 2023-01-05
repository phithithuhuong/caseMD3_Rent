const BaseController = require('./baseController.js');
const RoomModel = require('../model/roomModel.js');
const qs = require('qs');
const url = require('url');
const navbar = require('../view/navbar.js');
const Database = require("../model/connection");

class Room extends BaseController {
    static view = async (req, res) => {
        let dataHTML = await this.readFile('./view/room/room.html');
        let roomHTML = '';
        let rooms = await RoomModel.getRooms();
        rooms.forEach((item) => {
            roomHTML +=
                `<tr>
                <td> ${item.rID} </td>
                <td> <img src="${item.image}" class="modal-sm" alt="image"/>  </td>
                <td><b>${item.name}</b></td>
                <td>${item.status}</td>
                <td>${item.price}.000$</td>
                <td>${item.type}</td>
             
                <td> 
                    ${item.checkIn ? item.checkIn.toLocaleTimeString() : ''}<br>
                    ${item.checkIn ? item.checkIn.toLocaleDateString() : ''}
                </td>
                <td> 
                    ${item.checkout ? item.checkout.toLocaleTimeString() : ''}<br>
                    ${item.checkout ? item.checkout.toLocaleDateString() : ''}
                </td>
              
                
                <td>
                    <button type="button" class="btn btn-info">
                        <a href="/room/edit?rID=${item.rID}" class="text-white">
                            Edit
                        </a>
                    </button>
                    <button type="button" class="btn btn-info ${item.status === 'rented' ? 'disabled' : ''}">
                        <a ${item.status === 'rented' ? '#' : `href="/room/delete?rID=${item.rID}&status=${item.status}"`} class="text-white">
                            Delete
                        </a>
                    </button>
                </td>
            </tr>`
        });
        res.writeHead(200, 'Content-Type', 'text/html');
        dataHTML = dataHTML.replace('<tbody></tbody>', roomHTML);
        dataHTML = dataHTML.replace('<nav></nav>', navbar);
        res.write(dataHTML);
        res.end();
    }

    static  delete = async (req, res) => {
        let data = url.parse(req.url).query;
        let {rID} = qs.parse(data);
            await RoomModel.deleteRoom(rID);
        res.writeHead(301, {Location: '/room'});
        res.end();
    }

    static add = async (req, res) => {
        if (req.method === "GET") {
            let dataHTML = await this.readFile('./view/room/add.html');
            dataHTML = dataHTML.replace('<nav></nav>', navbar);
            res.write(dataHTML);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', () => {
                let room = qs.parse(data);
                RoomModel.addRoom(room.name, room.type, room.price, room.image);
                res.writeHead(301, {Location: '/room'});
                res.end();
            })
        }
    }

    static edit = async (req, res) => {
        let rID = qs.parse(url.parse(req.url).query).rID;
        if (req.method === "GET") {

            let room = (await RoomModel.getRoomByID(rID))[0];
            console.log(room);
            let dataHTML = await this.readFile('./view/room/edit-room.html');
            dataHTML = dataHTML.replace('<nav></nav>', navbar);
            dataHTML = dataHTML.replace('valueRID', `value="${rID}"`);
            dataHTML = dataHTML.replace('valueName', `value="${room.name}"`);
            dataHTML = dataHTML.replace(`value="${room.type}"`, `value="${room.type}" selected`);
            dataHTML = dataHTML.replace('valuePrice', `value="${room.price}"`);
            dataHTML = dataHTML.replace('valueImage', `value="${room.image}"`);
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
                RoomModel.updateRoomInfo(rID, room.name, room.type, room.price, room.image);
                res.writeHead(301, {Location: '/room'});
                res.end();
            })
        }

    }

    static update = async (req, res) => {
        let rID = qs.parse(url.parse(req.url).query).rID;
        RoomModel.updateStatus(rID, `Hired`);
        res.writeHead(301, {Location: '/rent'});
        res.end();
    }
    static search = (req, res) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', async () => {
            let search = qs.parse(data);
            console.log(search.search);
            let dataHTML = await this.readFile('./view/room/room.html');
            let roomHTML = '';
            let rooms = await RoomModel.search(search.search)
            rooms.forEach((item) => {
                roomHTML +=
                    `<tr>
                <td> ${item.rID} </td>
                <td> <img src="${item.image}" class="modal-sm" alt="image"/>  </td>
               <td><b>${item.name}</b></td>
                <td>${item.status}</td>
             
                <td> 
                    ${item.checkIn ? item.checkIn.toLocaleTimeString() : ''}<br>
                    ${item.checkIn ? item.checkIn.toLocaleDateString() : ''}
                </td>
                <td> 
                    ${item.checkout ? item.checkout.toLocaleTimeString() : ''}<br>
                    ${item.checkout ? item.checkout.toLocaleDateString() : ''}
                </td>
              
                
                <td>
                    <button type="button" class="btn btn-info">
                        <a href="/room/edit?rID=${item.rID}" class="text-white">
                            Edit
                        </a>
                    </button>
                    <button type="button" class="btn btn-info ${item.status === 'rented' ? 'disabled' : ''}">
                        <a ${item.status === 'rented' ? '#' : `href="/room/delete?rID=${item.rID}&status=${item.status}"`} class="text-white">
                            Delete
                        </a>
                    </button>
                </td>
            </tr>`
            });
            res.writeHead(200, 'Content-Type', 'text/html');
            dataHTML = dataHTML.replace('<tbody></tbody>', roomHTML);
            dataHTML = dataHTML.replace('<nav></nav>', navbar);
            res.write(dataHTML);
            res.end();
        })
    }

}

module.exports = Room;