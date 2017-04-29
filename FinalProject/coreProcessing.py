


# TODO: make for loop that goes through all the images and creates a new image using the mask


# TODO: use homework 6 that uses the mask

import cv2
import os
# Load two images

SRC_FOLDER = "images/source/"
subfolders = os.walk(SRC_FOLDER)
for dirpath, dirnames, fnames in subfolders:
    print(dirpath)
    print(dirnames)
    print(fnames)

#  CODE FROM ONLINE at http://docs.opencv.org/3.0-beta/doc/py_tutorials/py_core/py_image_arithmetics/py_image_arithmetics.html
#
# img1 = cv2.imread(os.path.join("images", "source") + 'messi5.jpg')
# img2 = cv2.imread('opencv_logo.png')
#
# # I want to put logo on top-left corner, So I create a ROI
# rows,cols,channels = img2.shape
# roi = img1[0:rows, 0:cols ]
#
# # Now create a mask of logo and create its inverse mask also
# img2gray = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
# ret, mask = cv2.threshold(img2gray, 10, 255, cv2.THRESH_BINARY)
# mask_inv = cv2.bitwise_not(mask)
#
# # Now black-out the area of logo in ROI
# img1_bg = cv2.bitwise_and(roi,roi,mask = mask_inv)
#
# # Take only region of logo from logo image.
# img2_fg = cv2.bitwise_and(img2,img2,mask = mask)
#
# # Put logo in ROI and modify the main image
# dst = cv2.add(img1_bg,img2_fg)
# img1[0:rows, 0:cols ] = dst
#
# cv2.imshow('res',img1)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
