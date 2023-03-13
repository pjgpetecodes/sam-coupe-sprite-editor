;
; -----------------------------------------------------------------------------------
; |                                                                                 |
; | Program:    SAM Coupe Sprites Tutorial 2                                        |
; | Filename:   Sprites2.asm                                                        |
; | Version:    1.0                                                                 |
; | Date:       12/10/2017                                                          |
; | Author:     Pete Gallagher - PJG Creations Ltd                                  |
; |                                                                                 |
; -----------------------------------------------------------------------------------
;
		ORG 	0x8000		; Store the program in User Address Space
                DUMP	1,0             ;
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
                LD	(System_SP+1),SP; Get the Current Stack Pointer Location and Overwrite...
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
;                CALL    Wait_For_Key    ; Wait for a keypress
;
; Print a sprite in the top left corner
;
                LD      DE,0x0000       ; Point to the Top Left corner of our screen
;
; Print a Sprite
;
print_sprite:	LD 	HL,Sprite1_1    ; Set pointer to start of our Sprite 
                LD      C,32            ; Setup Line counter, 32 lines per sprite to print
;
; This is the start of our Sprite Printing Loop
;
Print_Loop:		LD 	B,16		; Set up loop counter, 16 bytes per line of a sprite to print
;
Print_Loop1:	LD 		A,(HL)		; Get Sprite from pointer
                BIT     0,C             ; Check if this is an odd or even line...
                JR 		NZ,Odd_Line	; ... If this is an odd line (Bit 0 is a 1), then print an odd line...
                JP      Even_Line       ; ... Otherwise, print an even line
;
; We've printed a pixel... Wait for a keypress then set for the next pixel in our Sprite...
;               
Print_Loop2:    
;
; Note: You can uncomment this line if you want to step through the Sprite being drawn!
;
;               CALL    Wait_For_Key    ;               
;
                INC     DE              ; Move to the next Screen Position
                INC 	HL		; Move to next Sprite Byte
				
                DJNZ 	Print_Loop1	; If we've not yet reach the last Sprite Byte, then loop                
;
                LD      E,0             ; Point to the Left of our screen
                BIT     0,C             ; Check if this is an odd or even line...
                JR 		Z,Print_Loop3   ; ... If this is an even line (Bit 0 is a 0), Dont' increment yet...
                INC     D               ; ... Otherwise, set for the next line
;
; Increment the Line Counter
;
Print_Loop3:    LD      A,C             ; Move C Register to A ready for Subtraction
                LD      C,1             ; C= 1
                SUB     C               ; Set for Next Sprite Line - Decrement C by 1 - Subtract C (1) from A 
                LD      C,A             ; Move A Register back to C Register (Line Counter)
                JR 		NZ,print_loop   ; Repeat if we're not on the last line
                CALL    Wait_For_Key    ;               
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
;
;
Odd_Line:       SET     7,E             ;
                LD      (DE),A          ; Set the colour of pixels 0,2 and 0,3 to White
                JP      Print_Loop2     ;
;
;
;
Even_Line:      RES     7,E             ;
                LD      (DE),A          ; Set the colour of pixels 0,2 and 0,3 to White
                JP      Print_Loop2     ;
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
Key_Loop:       CALL	JREADKEY	; Read the Keyboard (Zero if no key)
       			JR 		Z,Key_Loop      ; If no key pressed, then loop
;
No_Key_Loop:    CALL	JREADKEY	; Read the Keyboard (Zero if no key)
       			JR 		NZ,No_Key_Loop  ; If key still pressed, then loop
;
                DI                      ; Disable Interuprts
;				
Scr_Page:		LD      A,0          	; Place holder for the Screen Page...
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
Sprite1_1:      DEFB      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
Sprite1_2:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_3:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_4:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_5:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_6:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_7:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_8:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_9:      DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_10:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_11:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_12:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_13:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_14:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_15:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_16:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_17:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_18:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_19:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_20:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_21:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_22:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_23:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_24:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_25:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_26:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_27:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_28:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_29:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_30:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_31:     DEFB      0xF4, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x44, 0x4F
Sprite1_32:     DEFB      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF