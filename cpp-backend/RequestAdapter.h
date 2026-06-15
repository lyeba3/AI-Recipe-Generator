// #ifndef ADAPTER_H
// #define ADAPTER_H

// #include<iostream>

// using namespace std;

// class RequestAdapter{

// public:

//string adapt(string ingredients,string preference)
// {
//return preference + " : " + ingredients;

// }

// };

// #endif

#ifndef REQUESTADAPTER_H
#define REQUESTADAPTER_H

#include<iostream>
#include<string>

using namespace std;

class RequestAdapter{

public:

    string extractJson(

        string request

    ){

        size_t jsonStart =

        request.find(

        "\r\n\r\n"

        );

        string jsonData =

        request.substr(

        jsonStart+4

        );

        size_t end =

        jsonData.find_last_of(

        '}'

        );

        jsonData =

        jsonData.substr(

        0,

        end+1

        );

        return jsonData;

    }

};

#endif