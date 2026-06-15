// #include <iostream>
// #include <string>
// #include <winsock2.h>
// #include <fstream>
// #include<iostream>
// #include "Strategy.h"
// #include "HighProteinStrategy.h"
// #include "VeganStrategy.h"
// #include "KetoStrategy.h"
// #include "RequestAdapter.h"

// using namespace std;
// #pragma comment(lib, "ws2_32.lib")

// using namespace std;

// int main() {

//     WSADATA wsa;
//     SOCKET serverSocket, clientSocket;
//     sockaddr_in server, client;
//     int clientSize = sizeof(client);

//     WSAStartup(MAKEWORD(2,2), &wsa);

//     serverSocket = socket(AF_INET, SOCK_STREAM, 0);

//     server.sin_family = AF_INET;
//     server.sin_addr.s_addr = INADDR_ANY;
//     server.sin_port = htons(18080);

//     bind(serverSocket, (sockaddr*)&server, sizeof(server));

//     listen(serverSocket, 3);

//     cout << "Server running on port 18080..." << endl;

//     while(true) {

//         clientSocket = accept(serverSocket, (sockaddr*)&client, &clientSize);

//         char request[5000];

//         recv(clientSocket, request, sizeof(request), 0);

//         string req(request);

//         cout << req << endl;

//         // Handle OPTIONS request
//         if(req.find("OPTIONS") != string::npos)
//         {
//             string response =
//                 "HTTP/1.1 200 OK\r\n"
//                 "Access-Control-Allow-Origin: *\r\n"
//                 "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"
//                 "Access-Control-Allow-Headers: Content-Type\r\n"
//                 "Content-Length: 0\r\n"
//                 "\r\n";

//             send(clientSocket, response.c_str(), response.length(), 0);

//             closesocket(clientSocket);

//             continue;
//         }

//         size_t jsonStart = req.find("\r\n\r\n");

//       string jsonData = req.substr(jsonStart + 4);

//     size_t end = jsonData.find_last_of('}');

//     jsonData = jsonData.substr(0, end + 1);
//         // Save JSON safely
//         ofstream temp("data.json");
//         temp << jsonData;
//         temp.close();

//        string command =
//     "curl.exe -s -X POST http://127.0.0.1:5000/generate "
//     "-H \"Content-Type: application/json\" "
//     "--data @data.json "
//     "> response.txt";
//         system(command.c_str());

//         ifstream file("response.txt");

//         string flaskResponse(
//             (istreambuf_iterator<char>(file)),
//             istreambuf_iterator<char>()
//         );

//         string response =
//             "HTTP/1.1 200 OK\r\n"
//             "Access-Control-Allow-Origin: *\r\n"
//             "Content-Type: application/json\r\n"
//             "Content-Length: " + to_string(flaskResponse.length()) + "\r\n"
//             "\r\n" +
//             flaskResponse;

//         send(clientSocket, response.c_str(), response.length(), 0);

//         closesocket(clientSocket);
//     }

//     closesocket(serverSocket);

//     WSACleanup();

//     return 0;
// }



#include <iostream>
#include <string>
#include <winsock2.h>
#include <fstream>

#include "Strategy.h"
#include "HighProteinStrategy.h"
#include "VeganStrategy.h"
#include "KetoStrategy.h"
#include "RequestAdapter.h"

#pragma comment(lib, "ws2_32.lib")

using namespace std;

int main() {

    WSADATA wsa;

    SOCKET serverSocket,
           clientSocket;

    sockaddr_in server,
                client;

    int clientSize =
    sizeof(client);

    WSAStartup(

        MAKEWORD(2,2),

        &wsa

    );

    serverSocket = socket(

        AF_INET,

        SOCK_STREAM,

        0

    );

    server.sin_family = AF_INET;

    server.sin_addr.s_addr =
    INADDR_ANY;

    server.sin_port =
    htons(18080);

    bind(

        serverSocket,

        (sockaddr*)&server,

        sizeof(server)

    );

    listen(

        serverSocket,

        3

    );

    cout

    <<

    "Server running on port 18080..."

    <<

    endl;

    while(true){

        clientSocket = accept(

            serverSocket,

            (sockaddr*)&client,

            &clientSize

        );

        char request[5000];

        recv(

            clientSocket,

            request,

            sizeof(request),

            0

        );

        string req(request);

        cout

        <<

        req

        <<

        endl;

        // OPTIONS

        if(

        req.find("OPTIONS")

        !=

        string::npos

        )

        {

            string response =

            "HTTP/1.1 200 OK\r\n"

            "Access-Control-Allow-Origin: *\r\n"

            "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"

            "Access-Control-Allow-Headers: Content-Type\r\n"

            "Content-Length: 0\r\n"

            "\r\n";

            send(

                clientSocket,

                response.c_str(),

                response.length(),

                0

            );

            closesocket(

                clientSocket

            );

            continue;

        }

        //------------------------------------------------
        // Adapter Pattern
        //------------------------------------------------

        RequestAdapter adapter;

        string jsonData =

        adapter.extractJson(

        req

        );

        //------------------------------------------------
        // Strategy Pattern
        //------------------------------------------------

        Strategy* strategy;

        if(

        jsonData.find(

        "High Protein"

        )

        !=

        string::npos

        )

        {

            strategy =

            new HighProteinStrategy();

        }

        else if(

        jsonData.find(

        "Vegan"

        )

        !=

        string::npos

        )

        {

            strategy =

            new VeganStrategy();

        }

        else

        {

            strategy =

            new KetoStrategy();

        }

        cout

        <<

        strategy->getPrompt(

        "Recipe Request"

        )

        <<

        endl;

        delete strategy;

        //------------------------------------------------
        // Save JSON
        //------------------------------------------------

        ofstream temp(

            "data.json"

        );

        temp

        <<

        jsonData;

        temp.close();

        //------------------------------------------------
        // Call Flask Server
        //------------------------------------------------

        string command =

        "curl.exe -s -X POST "

        "http://127.0.0.1:5000/generate "

        "-H \"Content-Type: application/json\" "

        "--data @data.json "

        "> response.txt";

        system(

            command.c_str()

        );

        //------------------------------------------------
        // Read Flask Response
        //------------------------------------------------

        ifstream file(

            "response.txt"

        );

        string flaskResponse(

            (istreambuf_iterator<char>(file)),

            istreambuf_iterator<char>()

        );

        //------------------------------------------------
        // Send Response Back
        //------------------------------------------------

        string response =

        "HTTP/1.1 200 OK\r\n"

        "Access-Control-Allow-Origin: *\r\n"

        "Content-Type: application/json\r\n"

        "Content-Length: "

        +

        to_string(

        flaskResponse.length()

        )

        +

        "\r\n"

        "\r\n"

        +

        flaskResponse;

        send(

            clientSocket,

            response.c_str(),

            response.length(),

            0

        );

        closesocket(

            clientSocket

        );

    }

    closesocket(

        serverSocket

    );

    WSACleanup();

    return 0;

}