#ifndef VEGAN_H
#define VEGAN_H

#include "Strategy.h"

class VeganStrategy:

public Strategy{

public:

string getPrompt(string ingredients)
{ 
    return "Generate Vegan Recipe using " + ingredients;

}

};

#endif