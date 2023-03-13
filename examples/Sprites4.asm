;
; -----------------------------------------------------------------------------------
; |                                                                                 |
; | Program:    SAM Coupe Sprites Tutorial 4                                        |
; | Filename:   Sprites4.asm                                                        |
; | Version:    1.1                                                                 |
; | Date:       13/03/2023                                                          |
; | Author:     Pete Gallagher - PJG Creations Ltd                                  |
; |                                                                                 |
; -----------------------------------------------------------------------------------
;
		ORG 	0x8000			; Store the program in User Address Space
                DUMP	1,0     ;
                autoexec		; Automatically Execute the Program
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
                OR      0b00100000      ; Set Bit 5 which, when loaded into the LMPR register...
                                        ; ... will Set the RAM in Page 0
                OUT     (LMPR),A        ;
;
; All of the above shifting around of the Stack Pointer, allows us to Call routines...
; ... Which of course will store their return location on the Stack Pointer...
; ... This would've overwritten some of the Screen Page if left unreseolved...
;
;                CALL    Wait_For_Key   ; Wait for a keypress
;
; Print a sprite in the top left corner
;
                LD      DE,0x0000       ; Point to the Top Left corner of our screen
;
; Print a Sprite
;
print_sprite:	LD 		HL,Sprite1_1    ; Set pointer to start of our Sprite 
                LD 		BC,512			; Set up loop counter, 16 bytes per Row of a sprite to print
;
				JP		Print_Loop1		; We must skip the first increment here so that we start at 0
;
; This is the start of our Sprite Printing Loop
;
Print_Loop:		LD      A,E             ;
                ADD     112             ;
                LD      E,A             ;
                INC     D               ; Set for the Next Row taking account of our x position
;
; Print the Even Row of the Sprite
;
Print_Loop1:    FOR     16, LDI			; This is a PYZ80 directive which inserts 16 LDI instructions
;
                LD      A,E             ;
                ADD     112             ;
                LD      E,A             ; Set for the Next Row taking account of our x position
;
; Print the Odd Row of the Sprite
;
                FOR     16, LDI			; This is a PYZ80 directive which inserts 16 LDI instructions
;
; LDI Moves the Value at the location pointed to by (HL)...
; ... into the location pointed to by (DE)...
; ... It then Decrements BC, setting P/V (Parity / Overflow) flag if the BC has reached zero
;
                JP      PE, Print_Loop  ; Loop until BC = zero (i.e. P/V set)
;
                CALL    Wait_For_Key    ;
;
;
; We must remember to switch BASIC back into Page 0
;
                LD      A,0x1F          ; Set ROM0 back into Page A...
                OUT     (LMPR), A       ; ... So that when we try to return to BASIC it all still works!
;
; Return the System Stack Pointer to it's original location in Bank B somewhere...
;
System_SP:		LD   	SP,0            ; Place holder for the System Stack Location...
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
Wait_For_Key:   PUSH    BC              ; Save the BC Registers
                PUSH    DE              ; Save the DE Registers
                PUSH    HL              ; Save the HL Registers
                LD		A,0x1F          ; Set for ROM in Page A
                OUT 	(LMPR),A        ; 
;
Key_Loop:       CALL	JREADKEY		; Read the Keyboard (Zero if no key)
       			JR 		Z,Key_Loop      ; If no key pressed, then loop
;
No_Key_Loop:    CALL	JREADKEY		; Read the Keyboard (Zero if no key)
       			JR 		NZ,No_Key_Loop  ; If key still pressed, then loop
;
                DI                      ; Disable Interuprts
;				
Scr_Page:		LD      A,0	        	; Place holder for the Screen Page...
                                        ; ...The 0 will be overwritten above once we know where it is...
                OUT		(LMPR),A        ; Page the Screen into the relevant Page 
                POP     HL              ; Retrieve the HL Registers
                POP     DE              ; Retrieve the DE Registers
                POP     BC              ; Retrieve the BC Registers
                RET                     ;
;
; ***********************************************************************************
; *                                                                                 *
; *                                     Sprites                                     *
; *                                                                                 *
; ***********************************************************************************
;

Sprite1_1:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_2:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_3:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_4:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_5:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &FF, &00, &FF, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_6:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_7:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &0F, &00, &FF, &00, &FF, &00, &0F, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_8:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_9:    DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &0F, &00, &F0, &00, &0F, &00, &00, &00, &FF, &00, &0F, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_10:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &0F, &00, &0F, &00, &F0, &00, &FF, &00, &0F, &00, &0F, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_11:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &F0, &00, &FF, &00, &F0, &00, &FF, &00, &F0, &00, &F0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_12:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &F0, &00, &F0, &00, &00, &00, &00, &00, &F0, &00, &F0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_13:   DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &FF, &00, &F0, &00, &F0, &00, &F0, &00, &00, &00, &00, &00, &F0, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_14:   DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &0F, &00, &FF, &00, &00, &00, &FF, &00, &F0, &00, &0F, &00, &FF, &00, &00, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF
Sprite1_15:   DEFB      &FF, &FF, &FF, &F0, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &FF, &00, &00, &00, &0F, &00, &FF, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &FF, &FF, &FF
Sprite1_16:   DEFB      &FF, &FF, &FF, &F0, &0A, &00, &AA, &00, &0F, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &FF, &FF, &FF
Sprite1_17:   DEFB      &FF, &FF, &FF, &F0, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &00, &00, &00, &00, &00, &00, &0F, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &FF, &FF, &FF
Sprite1_18:   DEFB      &FF, &FF, &FF, &F0, &0A, &00, &AA, &00, &0F, &00, &FF, &00, &F0, &00, &00, &00, &00, &00, &FF, &00, &FF, &00, &0A, &00, &AA, &00, &0F, &00, &FF, &FF, &FF, &FF
Sprite1_19:   DEFB      &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &F0, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &F0, &00, &F0, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF
Sprite1_20:   DEFB      &FF, &FF, &FF, &FF, &FF, &F0, &FF, &00, &FF, &F0, &0F, &00, &FF, &00, &FF, &00, &FF, &00, &FF, &00, &0F, &00, &FF, &F0, &FF, &00, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_21:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &0F, &00, &FF, &00, &FF, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_22:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &00, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_23:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &0A, &00, &AA, &00, &AF, &00, &AA, &00, &AA, &00, &0F, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_24:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &AA, &00, &AF, &00, &A0, &00, &AF, &00, &AA, &00, &A0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_25:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &AA, &00, &AA, &00, &A0, &00, &AA, &00, &AA, &00, &A0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_26:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &AA, &00, &AA, &00, &A0, &00, &AA, &00, &AA, &00, &A0, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_27:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &00, &00, &00, &00, &00, &0F, &00, &00, &00, &00, &00, &00, &00, &FF, &0F, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_28:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &F0, &FF, &00, &FF, &00, &FF, &0F, &FF, &00, &FF, &00, &FF, &00, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_29:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_30:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_31:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF
Sprite1_32:   DEFB      &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF, &FF