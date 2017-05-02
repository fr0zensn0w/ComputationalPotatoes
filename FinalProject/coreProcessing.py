
import cv2
import os
import sys
import numpy as np,sys



print("Inside core processing python file")
sys.stdout.flush()
# Load two images
imageNames = []

SRC_FOLDER = "images/source"
subfolders = os.walk(SRC_FOLDER)
OUT_FOLDER = "images/out"

frameOne = cv2.imread(os.path.join(SRC_FOLDER,"videoframe0001.jpg"), cv2.IMREAD_COLOR)
mask = cv2.imread(os.path.join(SRC_FOLDER, "mask.jpg"), cv2.IMREAD_COLOR)
cv2.imwrite("mask2.jpg", mask)
imageSize = frameOne.size
newMask = frameOne.copy()
for i in range(frameOne.shape[0]):
	for j in range(frameOne.shape[1]):
		if mask[i][j].any() == 0: # Not black/not mask
			# currFrame[i][j] = frameOne[i][j]
			newMask[i][j] = [0,0,0]
		else:
			newMask[i][j] = [1,1,1]
print(newMask.dtype)

# Loop through all video frame files
for file in os.listdir(SRC_FOLDER):
	if "videoframe" in file:
		# data type is uint8
		currFrame = cv2.imread(os.path.join(SRC_FOLDER, file), cv2.IMREAD_COLOR)
		if currFrame != None:

			# generate Gaussian pyramid for A
			G = frameOne.astype(np.float32)
			gpA = [G]
			for i in xrange(6):
				G = cv2.pyrDown(G)
				gpA.append(G.astype(np.float32))

			# generate Gaussian pyramid for B
			G = currFrame.astype(np.float32)
			gpB = [G]
			for i in xrange(6):
				G = cv2.pyrDown(G)
				gpB.append(G.astype(np.float32))

		    # generate Gaussian pyramid for mask
			G = newMask.astype(np.float32)
			gpM = [G]
			for i in xrange(6):
				G = cv2.pyrDown(G)
				gpM.append(G.astype(np.float32))

			# generate Laplacian pyramid for A
			lpA = [gpA[5]]
			for i in xrange(5,0,-1):
				rows,cols = gpA[i-1].shape[:2]
				GE = cv2.pyrUp(gpA[i])[:rows, :cols]
				L = cv2.subtract(gpA[i-1], GE)
				lpA.append(L)

			# generate Laplacian pyramid for B
			lpB = [gpB[5]]
			for i in xrange(5,0,-1):
				rows,cols = gpB[i-1].shape[:2]
				GE = cv2.pyrUp(gpB[i])[:rows, :cols]
				L = cv2.subtract(gpB[i-1], GE)
				lpB.append(L)

			LS = []
			length = len(lpA)
			for i in range(length):
				LS.append(lpB[i]*gpM[length-i-1] + lpA[i]*(1-gpM[length-i-1]))

			# now reconstruct
			# ls_ = LS[0]
			# for i in xrange(1,6):
			# 	ls_ = cv2.pyrUp(ls_)
			# 	ls_ = cv2.add(ls_, LS[i])

			ls_ = LS[0]
			for i in xrange(1,6):
				rows,cols = LS[i].shape[:2]
				ls_ = cv2.pyrUp(ls_)[:rows,:cols]
				ls_ = cv2.add(ls_, LS[i])

			ls_ = np.clip(ls_, 0, 255)
			ls_ = ls_.astype(np.uint8)

			cv2.imwrite(os.path.join(OUT_FOLDER, file), ls_)
			print(file + " has been written")
			sys.stdout.flush()

print("FRAME MODIFICATION COMPLETE")

sys.stdout.flush()
