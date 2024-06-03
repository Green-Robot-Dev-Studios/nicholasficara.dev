---
title: Making YouTube Videos Completely Automatically
author: Nicholas Ficara
date: 2020-09-09
tags:
  - YouTube
  - PIL
  - Automation
---

I came across this type of channel on YouTube called Reddit readers. They use a text to speech software or a human voice over to read Reddit posts. There are plenty of them if you search up `reddit reader`. I realized that this is probably possible to do without any human interaction whatsoever.

## What I Built

This was the final product: https://youtu.be/8QHTimxYGes. I simply put in a Reddit link and it did the rest. With a bit more polish like an intro, it could be really good. I decided against going all the way because there are already enough of these Reddit readers and we *really* don't need another one.

## How I Built It

This was a surprisingly easy project. Here is how it went:

1. Use the Reddit api to get the content and title of the given post.
2. Separate the post into chunks of n words.
3. Pass each chunk through a text to speech algorithm.
4. Generate a png image with the text on it using python imaging library.
5. Use librosa to piece together the video with the correct timings.
6. Export the video.
7. Post to YouTube (I didn't do this part) 

## Conclusion

I enjoyed building this, and it was quite satisfying to send to my friends. This could totally replace the Reddit readers that use TTS software. It's not that complicated and could be expanded to have a dynamic image in the background like a GIF file.

The code is not on GitHub, mainly because there are a lot of dependencies, and it's not the best quality code, but if someone wants to use it or build on it, please go right ahead!

```python
import praw
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS
import cv2
import os
from mutagen.mp3 import MP3
from moviepy.editor import *
import textwrap
from textwrap import wrap
import tts.sapi
import librosa

voice = tts.sapi.Sapi()
reddit = praw.Reddit(client_id='', client_secret='', user_agent='')
hot_posts = reddit.subreddit('EntitledParents').hot(limit=10)
i = 0
fetched_posts = []
for post in hot_posts:
    fetched_posts.append(post.selftext)
    i = i+1
to_say = fetched_posts[2].split(" ")

to_say = wrap(fetched_posts[2], 420)

fnt = ImageFont.truetype('arial.ttf', 50)

chunk_num = 0
for chunk in to_say:
    if chunk == "":
        continue

    img = Image.new('RGBA', (1920, 1080), color = (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    chunk_wrapped = textwrap.wrap(chunk, width=50)

    
    current_h, pad = 200, 10
    for line in chunk_wrapped:
        w, h = d.textsize(line, font=fnt)
        d.text(((1920 - w) / 2, current_h), line, font=fnt)
        current_h += h + pad

    
    bg = Image.open("bg.png")
    bg.paste(img, (0, 0), img)
    bg.save('images/' + str(chunk_num) + '.png')

    voice.create_recording(str(chunk_num) + '.wav', chunk)
    
    chunk_num = chunk_num + 1

voice.create_recording('full.wav', fetched_posts[2])

image_folder = 'images'
video_name = 'video.mp4'

images = [img for img in os.listdir(image_folder) if img.endswith(".png")]
frame = cv2.imread(os.path.join(image_folder, images[0]))
height, width, layers = frame.shape
fourcc = cv2.VideoWriter_fourcc('F', 'M', 'P', '4')
video = cv2.VideoWriter(video_name, fourcc, 24, (width,height))

for image in images:
    for i in range(int(librosa.get_duration(filename=image.split(".")[0] + '.wav'))*24):
        video.write(cv2.imread(os.path.join(image_folder, image)))

cv2.destroyAllWindows()
video.release()
print("Final Export")
movie = VideoFileClip("video.mp4")
movie.write_videofile("finished_video.mp4", audio="full.wav", threads = 4, logger = None)


```

