# The SAM Coupe Sprite Editor

This code is a simple SAM Coupe Sprite Editor that allows you to design Sprites for the SAM Coupe using it's standard Pallete and export them as Sprite Data.

![image](images/screenshot2.png)

## How to use

You can use this to generate sprites that work with my SAM Coupe Graphics in Assembler tutorial here;

https://www.petecodes.co.uk/graphics-in-assembler-for-the-sam-coupe/


## Running Sam Coupe Locally

If you try to run the Sam Coupe locally, you may see a CORS error. This is because the Sam Coupe emulator is hosted on a different domain. To get around this, you can run a local server. The simplest option is to use [http.server](https://docs.python.org/3/library/http.server.html) or the node [http.server](https://www.npmjs.com/package/http-server).

You can run the Python server by running the following command in the root directory of the project:


```bash
python -m http.server 8000 
```

or the node server by running:

```bash
http-server -c-1 -p 8000
```

Once the server is running, you can access the emulator by launching the index.html file in your browser at http://localhost:8000.

## Export Format

An example of the export format is;

### Sprite Data

```
Sprite1_1:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_2:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_3:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_4:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_5:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_6:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_7:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &0F, &FF, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_8:    DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &FF, &FF, &FF, &F0, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_9:    DEFB      &FF, &FF, &FF, &FF, &FF, &0F, &F0, &0F, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_10:   DEFB      &FF, &FF, &FF, &FF, &FF, &0F, &0F, &F0, &FF, &0F, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_11:   DEFB      &FF, &FF, &FF, &FF, &F0, &F0, &FF, &F0, &FF, &F0, &F0, &FF, &FF, &FF, &FF, &FF
Sprite1_12:   DEFB      &FF, &FF, &FF, &FF, &F0, &F0, &F0, &00, &00, &F0, &F0, &FF, &FF, &FF, &FF, &FF
Sprite1_13:   DEFB      &FF, &FF, &FF, &FF, &F0, &F0, &F0, &00, &00, &F0, &F0, &FF, &FF, &FF, &FF, &FF
Sprite1_14:   DEFB      &FF, &FF, &F0, &00, &0F, &FF, &00, &FF, &F0, &0F, &FF, &00, &00, &FF, &FF, &FF
Sprite1_15:   DEFB      &FF, &FF, &0A, &AA, &0F, &FF, &FF, &00, &0F, &FF, &FF, &0A, &AA, &0F, &FF, &FF
Sprite1_16:   DEFB      &FF, &FF, &0A, &AA, &0F, &F0, &FF, &FF, &FF, &F0, &FF, &0A, &AA, &0F, &FF, &FF
Sprite1_17:   DEFB      &FF, &FF, &0A, &AA, &0F, &FF, &00, &00, &00, &0F, &FF, &0A, &AA, &0F, &FF, &FF
Sprite1_18:   DEFB      &FF, &FF, &0A, &AA, &0F, &FF, &F0, &00, &00, &FF, &FF, &0A, &AA, &0F, &FF, &FF
Sprite1_19:   DEFB      &FF, &FF, &F0, &00, &F0, &FF, &FF, &FF, &FF, &FF, &F0, &F0, &00, &FF, &FF, &FF
Sprite1_20:   DEFB      &FF, &FF, &FF, &FF, &FF, &0F, &FF, &FF, &FF, &FF, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_21:   DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &0F, &FF, &FF, &00, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_22:   DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_23:   DEFB      &FF, &FF, &FF, &FF, &FF, &0A, &AA, &AF, &AA, &AA, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_24:   DEFB      &FF, &FF, &FF, &FF, &F0, &AA, &AF, &A0, &AF, &AA, &A0, &FF, &FF, &FF, &FF, &FF
Sprite1_25:   DEFB      &FF, &FF, &FF, &FF, &F0, &AA, &AA, &A0, &AA, &AA, &A0, &FF, &FF, &FF, &FF, &FF
Sprite1_26:   DEFB      &FF, &FF, &FF, &FF, &F0, &AA, &AA, &A0, &AA, &AA, &A0, &FF, &FF, &FF, &FF, &FF
Sprite1_27:   DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &0F, &00, &00, &00, &FF, &FF, &FF, &FF, &FF
Sprite1_28:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_29:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_30:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_31:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_32:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
```

### Mask Data

```
Sprite1_M_1:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_2:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_3:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_4:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_5:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_6:  DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &00, &00, &00, &0F, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_7:  DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_8:  DEFB      &FF, &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_M_9:  DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &00, &FF, &FF, &FF, &FF, &FF
Sprite1_M_10: DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &00, &FF, &FF, &FF, &FF, &FF
Sprite1_M_11: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_12: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_13: DEFB      &FF, &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &FF, &FF
Sprite1_M_14: DEFB      &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF
Sprite1_M_15: DEFB      &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &FF
Sprite1_M_16: DEFB      &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &FF
Sprite1_M_17: DEFB      &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &FF
Sprite1_M_18: DEFB      &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &FF
Sprite1_M_19: DEFB      &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF
Sprite1_M_20: DEFB      &FF, &FF, &F0, &00, &F0, &00, &00, &00, &00, &00, &00, &F0, &00, &FF, &FF, &FF
Sprite1_M_21: DEFB      &FF, &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_M_22: DEFB      &FF, &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF, &FF
Sprite1_M_23: DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &00, &FF, &FF, &FF, &FF, &FF
Sprite1_M_24: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_25: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_26: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_27: DEFB      &FF, &FF, &FF, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &FF, &FF, &FF, &FF
Sprite1_M_28: DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &0F, &00, &00, &00, &FF, &FF, &FF, &FF, &FF
Sprite1_M_29: DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_30: DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_31: DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_M_32: DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
```

### Interleaved Mask and Sprite Data

```
Sprite1_1:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_2:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_3:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_4:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_5:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &FF, &00, &FF, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_6:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &00, &00, &00, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_7:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &0F, &00, &FF, &00, &FF, &00, &0F, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_8:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_9:    DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &0F, &00, &F0, &00, &0F, &00, &00, &00, &FF, &00, &0F, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_10:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &0F, &00, &0F, &00, &F0, &00, &FF, &00, &0F, &00, &0F, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_11:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &F0, &00, &FF, &00, &F0, &00, &FF, &00, &F0, &00, &F0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_12:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &F0, &00, &F0, &00, &00, &00, &00, &00, &F0, &00, &F0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_13:   DEFB      &FF, &00, &FF, &00, &F0, &0F, &00, &FF, &00, &F0, &00, &F0, &00, &F0, &00, &00, &00, &00, &00, &F0, &00, &F0, &00, &FF, &00, &FF, &FF, &00, &FF, &00, &FF, &00
Sprite1_14:   DEFB      &FF, &00, &FF, &00, &00, &F0, &00, &00, &00, &0F, &00, &FF, &00, &00, &00, &FF, &00, &F0, &00, &0F, &00, &FF, &00, &00, &00, &00, &0F, &F0, &FF, &00, &FF, &00
Sprite1_15:   DEFB      &FF, &00, &F0, &0F, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &FF, &00, &00, &00, &0F, &00, &FF, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &FF, &00, &FF, &00
Sprite1_16:   DEFB      &FF, &00, &F0, &0F, &00, &0A, &00, &AA, &00, &0F, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &FF, &00, &FF, &00
Sprite1_17:   DEFB      &FF, &00, &F0, &0F, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &FF, &00, &FF, &00
Sprite1_18:   DEFB      &FF, &00, &F0, &0F, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &F0, &00, &00, &00, &00, &00, &FF, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &FF, &00, &FF, &00
Sprite1_19:   DEFB      &FF, &00, &FF, &00, &00, &F0, &00, &00, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &00, &F0, &00, &00, &0F, &F0, &FF, &00, &FF, &00
Sprite1_20:   DEFB      &FF, &00, &FF, &00, &F0, &0F, &00, &FF, &F0, &0F, &00, &0F, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &0F, &F0, &0F, &00, &FF, &FF, &00, &FF, &00, &FF, &00
Sprite1_21:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &0F, &00, &FF, &00, &FF, &00, &00, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_22:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_23:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &0A, &00, &AA, &00, &AF, &00, &AA, &00, &AA, &00, &0F, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_24:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &AA, &00, &AF, &00, &A0, &00, &AF, &00, &AA, &00, &A0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_25:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &AA, &00, &AA, &00, &A0, &00, &AA, &00, &AA, &00, &A0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_26:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &AA, &00, &AA, &00, &A0, &00, &AA, &00, &AA, &00, &A0, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_27:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &00, &F0, &00, &00, &00, &00, &00, &0F, &00, &00, &00, &00, &00, &00, &0F, &F0, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_28:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &0F, &00, &FF, &00, &FF, &0F, &F0, &00, &FF, &00, &FF, &00, &FF, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_29:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_30:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_31:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
Sprite1_32:   DEFB      &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00
```
