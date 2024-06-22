from typing import List, Type


def from_record_to_dict(record) -> dict:
    return dict(record)


def from_record_list_to_dict_list(record_list) -> List[dict]:
    return [from_record_to_dict(record) for record in record_list]
