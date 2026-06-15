#ifndef HIGHPROTEIN_H
#define HIGHPROTEIN_H

#include "Strategy.h"

class HighProteinStrategy:

public Strategy{

public:

string getPrompt(string ingredients)
{ 
    return  "Generate High Protein Recipe using " + ingredients;

}

};

#endif