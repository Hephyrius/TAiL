# TAiL (Tron AI Library)

## What is TAiL
TAiL Is an AI Library and Deployer. The Library is used to train a neural network using python and user defined data. The Deployer is the front end of the dApp responsible for creating the network on the TVM and interacting with it. Iteraction being prediction on new data. The Frontend also allows Historic predictions to be reviewed. The models created with TAiL can be incorporated within other smart contract systems by referencing TAiL as an import, and interacting with the Predict function of the smart contract.


## Why is it needed

TAiL allows a fairly easy way of creating and deploying machine learning models to the TVM. This is something that is normally fairly complex. The Library simplifies the process by allowing you to train a model using python, export it as a json file and them deploy it via a reactjs front end.

## How to use it

### Step 1 Train the model

To get started we need to import our modules (these can be found under the python directory). 

``` python
from FeedForwardNeuralNetwork import FeedForwardNeuralNetwork as FFN
from GeneticOptomiser import GeneticOptomiser as GN
import pandas as pd
import numpy as np
```

we then need to import our data and make it useable, this is a standard data science pipeline example:
``` python
#import test data
data = pd.read_csv("TestData/iris.csv")

#split into features and labels
y = data['label']
x = data.drop(['label'], axis=1)

x = np.asarray(x)

#shift our values up by 1e8 so we dont have any decimal values
x = x

#convert string labels to integers
y = y.astype('category')
y = y.cat.codes
```

Finally we need to fit the TAiL machine learning model. This is done by initialising a model (GN). Fitting and fitting it to our data.
Once fitting is done, a .json file will be output in the same folder as the python file that is being executed.
``` python
#prepare the network
#first input is the number of candidates in our optomiser
#second is the layer sizes for the neural network
Genetic = GN(10, [4,2,3]) # where 10 is number of candidates per generation and [4,2,3] are the layer sizes.
Genetic.Fit(x, y, 10) # where x is variables, y is labels and 10 is number of epochs/generations

```

### Step 2 Deploy the model to TVM

This step is a simple step. On our TVM front end we need to navigate to the "Create New Network" section. This page allows us to navigate to the .json file we created in step 1. Once we have selected a file and clicked submit, a transaction will be created that will deploy a neural network to the tron virtual machine.

### step 3 Making a prediction

Note events for the front end for this are not functioning fully at the moment, but the contracts do predict as expected - in Remix and Tronstudio.

#### using the front end for prediction making
This step is also simple step. On our TVM front end we need to navigate to the "Make" section. This page allows set a network number, which is the unique deployed number stored on the TAiL contract. As well as input values, For each input (up to 10 inputs) a value can be added or left blank. Each value corrosponds to an input neuron so order of input should be the same as the order in which the data was trained with. 

#### using a smart contract for predictions
This step is a little more complex. Any smartcontract inheriting or using TAiL models needs to be importing the TAiLNN contract as well as pointing the contract to one of the addresses emitted during a creation event. This needs to be done either as a smart contract hard coded value or as a parameter. whichever is your need

Deployed at TNSNE8FrYhXionoZDNjYTtUWtzc6zt2VSX & TBf9RVryATzFR5FsQv6Rg8JyAiEiGaiHPD

### Tech Stack and Dependencies

Python3
Numpy
Pandas
Math
Random

NodeJS
TronWeb
TronBox
ReactJS
Bootstrap
yarn


### Deploying the smart contract

with /solidity/ as the current directory first compile all contracts by using 

``` 
tronbox compile --compile all
```

followed by deploying to the blockchain via:

``` 
tronbox migrate --reset
```

### Frontend 

this section assumes /react/ is the current directory

#### Development mode

You can launch nofilter in react development mode by running

```
yarn start
```

#### Compiling

the frontend can be compiled using 

```
yarn dev
```

#### Hosting

We can host the compiled files using pm2 and serve (
```
npm install -i -g pm2
npm install -i -g serve
```

and then we can deploy on our server using the following command with the compiled files in the same current directory

```
pm2 serve build
```

this deploys the frontend to port 8080
