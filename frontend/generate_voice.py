import asyncio
import edge_tts

VOICE = "en-GB-RyanNeural"
# 15-Second Director's Cut Script
TEXT = """
Beyond the enchanted forest... 
Where every flower blooms with magic...
lies a kingdom, waiting to be discovered. ... ...
A grand castle... 
preparing for a very special celebration. ...
Welcome. ... to Zia's magical day.
"""
OUTPUT_FILE = r"c:\Users\Rigor\Documents\GitHub\zia-birthday\frontend\public\narration.mp3"

async def main():
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="-10%", pitch="-5Hz")
    await communicate.save(OUTPUT_FILE)

if __name__ == "__main__":
    asyncio.run(main())
