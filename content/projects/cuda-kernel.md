+++
title = 'Custom CUDA Kernel'
date = '2024-01-05'
draft = false
summary = 'A custom CUDA kernel for masked 3D convolution operations.'
tech_stack = ['CUDA', 'C++', 'NVIDIA GPUs']
github_url = 'https://github.com/FloWsnr/CUDA-maskedConvolutions'
image = ''
image_alt = ''
featured = true
+++

During one of my papers, we needed to use multiple 3D convolutions to calculate some structural properties of porous media. However, for porous media, only the solid materials are of interest, so we needed to mask the convolutions while keeping a normalization to 1. This can be done with two convolutions divided, see the paper. To practice some CUDA, I now started to implement a masked convolution in CUDA, which should be faster than two cupy convolutions. Since I did not find any GeMM implementation, I started with the crude implementation.