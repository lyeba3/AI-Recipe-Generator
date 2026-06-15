#ifndef STRATEGY_H
#define STRATEGY_H

#include<iostream>
using namespace std;

class Strategy{

public:

virtual string getPrompt(string ingredients)=0;

};

#endif