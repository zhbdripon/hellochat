from PIL import Image
from django.core.exceptions import ValidationError
import os


def validate_icon_size(image):

    if image:
        with Image.open(image) as img:
            if img.height != img.width:
                raise ValidationError('Image must be square')
            if img.height > 70 or img.width > 70:
                raise ValidationError('Image must be at most 70x70 pixels')


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.png', '.jpeg', '.gif']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension')
