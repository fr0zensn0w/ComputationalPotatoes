import cv2
import os
import sys

# python script that takes in the source.mp4 video and converts it to images
# print("started python")
sys.stdout.flush()
vidcap = cv2.VideoCapture('source.mp4')
success,image = vidcap.read()
count = 0
success = True
out = os.path.join("images", "source", "video")
while success:
    success,image = vidcap.read()
    count += 1
    cv2.imwrite(out + "frame{0:04d}.jpg".format(count), image)     # save frame as JPEG file
    # print("frame%d.jpg Written" % count)
    print(count)
    sys.stdout.flush()

print("IMAGE EXTRACTION COMPLETE")
sys.stdout.flush()
