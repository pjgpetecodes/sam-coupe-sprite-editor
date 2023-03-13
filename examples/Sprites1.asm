;
; -----------------------------------------------------------------------------------
; |                                                                                 |
; | Program:    SAM Coupe Sprites Tutorial 1 - Part 1                               |
; | Filename:   Sprites1.asm                                                        |
; | Version:    1.0                                                                 |
; | Date:       12/10/2017                                                          |
; | Author:     Pete Gallagher - PJG Creations Ltd                                  |
; |                                                                                 |
; -----------------------------------------------------------------------------------
;
		autoexec		; Automatically Execute the Program
		ORG 	0x8000		; Store the program in User Address Space
;
; ***********************************************************************************
; *                                                                                 *
; *                                    Equates                                      *
; *                                                                                 *
; ***********************************************************************************
;
LMPR:           EQU     250             ; The Lower Memory Page Register Address 
HMPR:           EQU     251             ; The Higher Memory Page Register Address 
VMPR:           EQU     252             ; The Video Memory Page Register Address 
JCLSBL:         EQU     334             ; The Clear Screen Routine (Set A to 0 to clear the whole screen) (0x14E)
;
; ***********************************************************************************
; *                                                                                 *
; *                                Application Start                                *
; *                                                                                 *
; ***********************************************************************************
;
                CALL    Clear_Screen    ;
;
; Get the Current Screen Page and set the LMPR register up so we can write to the screen
;
                IN      A,(VMPR)        ; Get the VMPR Register, which holds info about...
                                        ; ... which Page the Screen is Paged Into
                AND     0B00011110      ; We're only interested in the Screen Page, so mask off everything but the Page Bits...
                                        ; ... The result will be stored in the A Register
                OR      0B00100000      ; Set Bit 5 which, when loaded into the LMPR register, will Set the RAM in Page 0
                OUT     (LMPR),A        ;
;
                CALL    Wait_For_Key    ;
;
; Print a sprite in the top left corner
;
                LD      HL,0x0000       ; Point to the Top Left corner of our screen
                LD      (HL),0xFF       ; Set the colour of pixels 0,0 and 0,1 to White               
                CALL    Wait_For_Key    ;
                LD      HL,0x0080       ; 
                LD      (HL),0x44       ; Set the colour of pixels 1,0 and 1,1 to Green
                CALL    Wait_For_Key    ;
                LD      HL,0x0001       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 0,2 and 0,3 to White
                CALL    Wait_For_Key    ;
                LD      HL,0x0081       ; 
                LD      (HL),0x44       ; Set the colour of pixels 1,2 and 1,3 to Green
                CALL    Wait_For_Key    ;
                LD      HL,0x0100       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 1,0 and 1,1 to White
                CALL    Wait_For_Key    ;
                LD      HL,0x0180       ; 
                LD      (HL),0x44       ; Set the colour of pixels 2,0 and 2,1 to Green
                CALL    Wait_For_Key    ;
                LD      HL,0x0101       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 1,2 and 1,3 to White
                CALL    Wait_For_Key    ;
                LD      HL,0x0181       ; 
                LD      (HL),0x44       ; Set the colour of pixels 2,2 and 2,3 to Green
                CALL    Wait_For_Key    ;               
;
; We must remember to switch BASIC back into Page 0
;
                LD      A,0x1F          ;
                OUT     (LMPR), A       ;
;
; Exit back to BASIC
;
                RET                     ;
;
; ***********************************************************************************
; *                                                                                 *
; *                                Clear the Screen                                 *
; *                                                                                 *
; ***********************************************************************************
;
Clear_Screen:   LD      A,0             ;
                CALL    JCLSBL          ;
                RET
;
; ***********************************************************************************
; *                                                                                 *
; *                                Wait for a KeyPres                               *
; *                                                                                 *
; ***********************************************************************************
;
Wait_For_Key:   IN      A, (LMPR)       ;
                RES     5, A            ;
                SET     0, A            ;
                OUT     (LMPR),A
;
Key_Loop:       CALL	&0169		; Read the Keyboard (Zero if no key)
       			JR 		Z,Key_Loop      ; If no key pressed, then loop
;
No_Key_Loop:    CALL	&0169		; Read the Keyboard (Zero if no key)
       			JR 		NZ,No_Key_Loop  ; If key still pressed, then loop
				
                IN      A,(LMPR)        ;
                SET     5, A            ;
                RES     0, A            ;
                OUT     (LMPR),A
;
                RET                     ;