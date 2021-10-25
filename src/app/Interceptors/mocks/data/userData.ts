import { Users } from "src/app/models/User";

export const userData: Users = [
      {
        "id": "mikedanforth@npr.com",
        "name": "Mike Danforth",
        "phoneNumber": "987-654-3210",
        "email": "MikeDanforth@npr.com",
        "contacts": [
          {
            id: "dougberman@npr.com",
            name: "Doug",
            email: "dougberman@npr.com",
            img: "./assets/images/profile_1.png"
          },
          {
            id: "petersegal@npr.com",
            name: "Peter",
            email: "petersegal@npr.com",
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
      },
      {
        "id": "dougberman@npr.com",
        "name": "Doug",
        "phoneNumber": "987-654-3210",
        "email": "DougBerman@npr.com",
        "contacts": [
          {
            id: "mikedanforth@npr.com",
            name: "Mike",
            email: "mikedanforth@npr.com",
            img: "./assets/images/profile_1.png"
          },
          {
            id: "billburtis@npr.com",
            name: "Bill",
            email: "billburtis@npr.com",
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
      },
      {
        "id": "petersegal@npr.com",
        "name": "Peter",
        "phoneNumber": "987-654-1381",
        "email": "PeterSegal@npr.com",
        "contacts": [
          {
            id: "mikedanforth@npr.com",
            name: "Mike",
            email: "mikedanforth@npr.com",
            img: "./assets/images/profile_1.png"
          },
          {
            id: "billburtis@npr.com",
            name: "Bill",
            email: "billburtis@npr.com",
            img: "./assets/images/profile_1.png"
          },
          {
            id: "00005",
            name: "Martha",
            email: null,
            img: "./assets/images/profile_1.png"
          }
        ],
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
      },
      {
        "id": "billburtis@npr.com",
        "name": "Bill",
        "phoneNumber": "987-654-1942",
        "email": "BillKurtis@npr.com",
        "contacts": [
          {
            id: "00006",
            name: "Martha",
            email: null,
            img: null
          }
        ],
        "img": "./assets/images/profile_1.png",
        "password": "abc123A!!"
      },
  ]
