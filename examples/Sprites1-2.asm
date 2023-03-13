;
; -----------------------------------------------------------------------------------
; |                                                                                 |
; | Program:    SAM Coupe Sprites Tutorial 1 - Part 2                               |
; | Filename:   Sprites1-2.asm                                                      |
; | Version:    1.2                                                                 |
; | Date:       12/10/2017                                                          |
; | Author:     Pete Gallagher - PJG Creations Ltd                                  |
; |                                                                                 |
; -----------------------------------------------------------------------------------
;
		autoexec		; Automatically Execute the Program
		ORG 	0x8000		; Store the program in User Address Space
                DUMP	1,0             ; Store the Program in Page 1 (B)
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
JCLSBL:         EQU     334             ; The Clear Screen Routine...
                                        ; ... Set A to 0 to clear the whole screen) (0x14E)
JREADKEY:       EQU     361             ; The Keyboard Read Routine...
                                        ; ... Returns with Z Flag set if no key pressed...
                                        ; ... Otherwise A = Keycode for key pressed
;
; ***********************************************************************************
; *                                                                                 *
; *                                Application Start                                *
; *                                                                                 *
; ***********************************************************************************
;
                DI                      ; Disable Interupts
;
; Becuase the Stack Pointer lives in Page B, but we're paging the Screen into Pages A and B,
; we need to make sure we save the current Stack Pointer location, and create our own location.
; We rewrite our program here effectively, by storing it's original location in a holding position.
;
                LD		(System_SP+1),SP; Get the Current Stack Pointer Location and Overwrite...
                                        ; ... the holding value below.
;
; Get the Current Screen Page and set the LMPR register up so we can write to the screen
;
                IN      A,(VMPR)        ; Get the VMPR Register, which holds info about...
                                        ; ... which Page the Screen is Paged Into
                AND     0b00011110      ; We're only interested in the Screen Page...
                                        ; ... so mask off everything but the Page Bits...
                                        ; ... The result will be stored in the A Register
                OR      0b00100000      ; Set Bit 5 which, when loaded into the LMPR register...
                                        ; ... will Set the RAM in Page 0
                LD		(Scr_Page+1),A  ; Overwrite the holding value for the Screen Page location...
                                        ; ... now that we know it
;                
                CALL    Clear_Screen    ; Clear the Screen
;
                LD		SP,0xC000       ; Set the Stack Pointer to a location of our choosing
;
                LD		A,(Scr_Page+1)  ; Get the current Screen Location which we stored earlier
;
				OUT     (LMPR),A        ;
;
; All of the above shifting around of the Stack Pointer, allows us to Call routines...
; ... Which of course will store their return location on the Stack Pointer...
; ... This would've overwritten some of the Screen Page if left unreseolved...
;
                CALL    Wait_For_Key    ; Wait for a keypress
;
; Print a sprite in the top left corner
;
                LD      HL,0x0000       ; Point to the Top Left corner of our screen
                LD      (HL),0xFF       ; Set the colour of pixels 0,0 and 0,1 to White               
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0080       ; 
                LD      (HL),0x44       ; Set the colour of pixels 1,0 and 1,1 to Green
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0001       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 0,2 and 0,3 to White
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0081       ; 
                LD      (HL),0x44       ; Set the colour of pixels 1,2 and 1,3 to Green
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0100       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 1,0 and 1,1 to White
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0180       ; 
                LD      (HL),0x44       ; Set the colour of pixels 2,0 and 2,1 to Green
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0101       ; 
                LD      (HL),0xFF       ; Set the colour of pixels 1,2 and 1,3 to White
                CALL    Wait_For_Key    ; Wait for a keypress
                LD      HL,0x0181       ; 
                LD      (HL),0x44       ; Set the colour of pixels 2,2 and 2,3 to Green
                CALL    Wait_For_Key    ; Wait for a keypress
;
; We must remember to switch BASIC back into Page 0
;
                LD      A,0x1F          ; Set ROM0 back into Page A...
                OUT     (LMPR), A       ; ... So that when we try to return to BASIC it all still works!
;
; Return the System Stack Pointer to it's original location in Bank B somewhere...
;
System_SP:		LD      SP,0            ; Place holder for the System Stack Location...
                                        ; This will be overwritten above once we know it's location
                EI                      ; Enable Interupts
;
; Return back to BASIC
;
                RET                     ;
;
; ***********************************************************************************
; *                                                                                 *
; *                                Clear the Screen                                 *
; *                                                                                 *
; ***********************************************************************************
;
Clear_Screen:   XOR     A               ; Clear the A register, so when passed into clear screen...
                                        ; ...it clears the whole screen
                CALL    JCLSBL          ; Clear the Screen
                DI                      ; Disable Interupts
                RET                     ;
;
; ***********************************************************************************
; *                                                                                 *
; *                                Wait for a KeyPres                               *
; *                                                                                 *
; ***********************************************************************************
;
Wait_For_Key:   LD		A,0x1F          ; Set for ROM in Page A
                OUT 	(LMPR),A        ; 
;
Key_Loop:       CALL	JREADKEY	; Read the Keyboard (Zero if no key)
       			JR 		Z,Key_Loop      ; If no key pressed, then loop
;
No_Key_Loop:    CALL	JREADKEY	; Read the Keyboard (Zero if no key)
       			JR 		NZ,No_Key_Loop  ; If key still pressed, then loop
;
                DI                      ; Disable Interuprts
;				
Scr_Page:		LD      A,0	        ; Place holder for the Screen Page...
                                        ; ...The 0 will be overwritten above once we know where it is...
                OUT		(LMPR),A        ; Page the Screen into the relevant Page 
                RET                     ;