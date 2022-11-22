# TODO
from cs50 import get_int
## loop for input height size
while (True):
    h = get_int("Height:")
    if (h < 1 or h > 8):
        h = get_int("Height:")
    if (h >= 1 or h <= 8):
        break
## for loop row " " and "#"
for i in range(1, h + 1):
    print(" " * (h - i), end="")
    print("#" * i, end="")
    print("  ",end="")
    print("#" * i,end="\n")
