import os
from mutagen.mp3 import MP3

audio = MP3(r"c:\Users\Rigor\Documents\GitHub\zia-birthday\frontend\public\narration.mp3")
print(f"DURATION: {audio.info.length}")
