# ============
# STATUS: DONE
# Branch: feature/supermarket_checkout
# ============

# Coding Kata

All technical interviews taken with _Strandkorb Jetzt_ will be performed in the same manner, in order to minimise variance in the recruitment process. This should ensure the interview process is fair to the candidates, and also that _Strandkorb Jetzt_ do not miss opportunities to hire good candidates.

The interview exercise that we will use during in person technical interviews is the “Checkout Kata”, which is described below, with annotations. The wording of the kata has been carefully crafted to provide a specific set of challenges and crutches to a candidate.

The text portion of the kata is as follows:

### Implement the code for a supermarket checkout that calculates the total price of a number of items.
This introductory sentence is worded to provide a basic overview of the domain the candidate should implement. The idea of a “supermarket checkout” is recognisable across the world, and so is a good relatable example requiring no pre-existing “domain knowledge”. The verb “calculate” is used to indicate that the primary logic of the code to be implemented is to calculate or sum the totals, and to give an example piece of domain terminology. The final points are “total price”, which again is a piece of domain terminology, and “number of items” which indicates the code should work for more than a single item.

### Items each have their own price, which can change frequently.
This sentence is used to introduce the idea that item prices should not be hard-coded, which should give the candidate the idea to use a pricing dictionary or repository to hold the prices. The words “change frequently” can be used as a discussion point around any hard-coding, especially if the hard-coding is not hidden behind a facade.

### There are also weekly special offers for when multiple items are bought.
This sentence is used to introduce the idea of special offers. The usage of “weekly” is to show that the offers also cannot be hard-coded. The reason “frequently” is not used in this case is to provide a discussion point should the candidate decide to implement some sort of “day of week”-based offers model, as the frequency at which the offers change is not relevant to the implementation of the domain.

### An example of this would be “Apples are 50 each or 3 for 130”.
This sentence is added specifically to provide a “red herring” for the candidate. A stumbling block in previous iterations of the exercise, which used the wording “Apples are 50 each or 3 for 120”, was that candidates would assume that as the prices are the same as those in the pricing table that “A” meant “Apples”. This pricing discrepancy can prompt a discussion around whether the example data is relevant to the problem at hand, or whether it’s simply additional information to help solve the problem.

The pricing table is also given:

| Item   |Price for 1 item | Offer                |
|--------|-----------------|----------------------|
| Apple  | 30              | 2 for 45             |
| Banana | 50              | 3 for 130            |
| Peach  | 60              |  -                   |
| Kiwi   | 20              |  -                   |

The checkout accepts the items in any order, so that if we scan an apple, a banana and another apple, we’ll recognise two apples and apply the discount of 2 for 45.

Please work as you would do in your usual job. We don't accept one single commit. We want to see the steps you would do usually.
