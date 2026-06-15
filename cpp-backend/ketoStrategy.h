#ifndef KETO_H
#define KETO_H

#include "Strategy.h"

class KetoStrategy:

public Strategy{

public:

string getPrompt(string ingredients)
{

 return "Generate Keto Recipe using " + ingredients;

}

};

#endif