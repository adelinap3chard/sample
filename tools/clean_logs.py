import os, sys, stat

def traverse_clean(directory):
	for file in os.listdir(directory):
		pathname = os.path.join(directory, file)
		mode = os.stat(pathname).st_mode
		if stat.S_ISDIR(mode):
			traverse_clean(pathname)
		elif not stat.S_ISREG(mode):
			print("Removing non-regular file: %s" % (pathname))
			os.unlink(pathname)

traverse_clean("/newz/logs/")